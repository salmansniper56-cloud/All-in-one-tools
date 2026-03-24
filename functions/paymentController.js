const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const crypto = require('crypto');

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// Razorpay configuration
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

// Plan pricing (in smallest currency unit - paise for INR)
const PLANS = {
  pro: {
    monthly: 99900, // $9.99 or ₹799
    yearly: 799900, // $79.99 or ₹6,399
    name: 'Pro Plan'
  },
  premium: {
    monthly: 199900, // $19.99 or ₹1,599
    yearly: 1499900, // $149.99 or ₹11,999
    name: 'Premium Plan'
  }
};

/**
 * Initiate Payment - Called from frontend
 * Creates a Razorpay Order and returns order details
 */
exports.initiatePayment = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  try {
    const { userId, planId, billingCycle = 'monthly' } = req.body;

    if (!userId || !planId) {
      return res.status(400).json({ error: 'Missing userId or planId' });
    }

    const plan = PLANS[planId];
    if (!plan) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    const amount = plan[billingCycle];

    // Get user email from Firestore
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userEmail = userDoc.data().email;

    // Create Razorpay Order
    const orderPayload = {
      amount: amount, // Amount in paise
      currency: 'INR',
      receipt: `order_${userId}_${Date.now()}`,
      notes: {
        userId,
        planId,
        billingCycle,
        purpose: 'ResumeForge subscription'
      }
    };

    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

    const razorpayResponse = await axios.post(
      'https://api.razorpay.com/v1/orders',
      orderPayload,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const order = razorpayResponse.data;

    // Save order details to Firestore for webhook verification
    await db.collection('orders').doc(order.id).set({
      userId,
      planId,
      billingCycle,
      amount,
      status: 'initiated',
      razorpayOrderId: order.id,
      userEmail,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes expiry
    });

    // Return order details to frontend
    return res.json({
      success: true,
      orderId: order.id,
      amount: amount,
      currency: 'INR',
      keyId: RAZORPAY_KEY_ID,
      planId,
      planName: plan.name,
      userEmail
    });

  } catch (error) {
    console.error('Error initiating payment:', error);
    return res.status(500).json({
      error: 'Failed to initiate payment',
      message: error.message
    });
  }
});

/**
 * Verify Payment - Called from frontend after user completes payment
 * Verifies Razorpay payment signature and updates user plan
 */
exports.verifyPayment = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      userId
    } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify Razorpay signature
    const generatedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({ error: 'Payment verification failed' });
    }

    // Get order details from Firestore
    const orderDoc = await db.collection('orders').doc(razorpayOrderId).get();
    if (!orderDoc.exists) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const orderData = orderDoc.data();
    const planId = orderData.planId;

    // Update user's plan in Firestore
    await db.collection('users').doc(userId).update({
      plan: planId,
      subscriptionStatus: 'active',
      lastPaymentDate: admin.firestore.FieldValue.serverTimestamp(),
      razorpayPaymentId
    });

    // Record payment in payments collection
    await db.collection('payments').add({
      userId,
      razorpayOrderId,
      razorpayPaymentId,
      planId,
      amount: orderData.amount,
      billingCycle: orderData.billingCycle,
      status: 'success',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Update order status
    await db.collection('orders').doc(razorpayOrderId).update({
      status: 'completed',
      paymentId: razorpayPaymentId,
      completedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return res.json({
      success: true,
      message: 'Payment verified successfully',
      planId
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({
      error: 'Payment verification failed',
      message: error.message
    });
  }
});

/**
 * Razorpay Webhook Handler
 * Receives webhook notifications from Razorpay for payment events
 */
exports.razorpayWebhook = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  try {
    const { event, payload } = req.body;

    // Verify webhook signature (optional but recommended)
    const signature = req.headers['x-razorpay-signature'];
    if (signature) {
      const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
      const generatedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(JSON.stringify(req.body))
        .digest('hex');

      if (generatedSignature !== signature) {
        return res.status(400).json({ error: 'Invalid signature' });
      }
    }

    if (event === 'payment.authorized') {
      const { id: paymentId, order_id: orderId, notes } = payload.payment.entity;

      const orderDoc = await db.collection('orders').doc(orderId).get();
      if (!orderDoc.exists) {
        return res.status(200).json({ received: true }); // Acknowledge receipt
      }

      const { userId, planId } = orderDoc.data();

      // Update user plan
      await db.collection('users').doc(userId).update({
        plan: planId,
        subscriptionStatus: 'active',
        lastPaymentDate: admin.firestore.FieldValue.serverTimestamp(),
        razorpayPaymentId: paymentId
      });

      // Record payment
      await db.collection('payments').add({
        userId,
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
        planId,
        status: 'success',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      console.log(`Payment authorized for user ${userId}, plan ${planId}`);
    }

    if (event === 'payment.failed') {
      const { order_id: orderId } = payload.payment.entity;

      const orderDoc = await db.collection('orders').doc(orderId).get();
      if (orderDoc.exists) {
        await db.collection('orders').doc(orderId).update({
          status: 'failed',
          failedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }

      console.log(`Payment failed for order ${orderId}`);
    }

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
});
