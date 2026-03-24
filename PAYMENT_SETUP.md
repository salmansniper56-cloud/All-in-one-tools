# Razorpay Payment Integration Setup Guide

## Overview
ResumeForge now has full Razorpay payment integration for premium plans. This guide walks you through setting up Razorpay to accept payments from both worldwide Visa cards and Pakistani Visa cards.

## What's Been Implemented

### ✅ Backend (Firebase Cloud Functions)
- **Payment Initiation** (`functions/paymentController.js`)
  - Creates Razorpay orders with user details
  - Stores order data in Firestore for tracking
  - Handles payment amount conversion

- **Payment Verification**
  - Verifies Razorpay payment signatures for security
  - Updates user's plan in Firestore on successful payment
  - Records payment transactions

- **Webhook Handler**
  - Listens for Razorpay payment events
  - Automatically updates user plan for completed payments
  - Handles failed payment scenarios

### ✅ Frontend Integration
- **PricingModal Component**
  - Razorpay Checkout popup integration
  - Monthly/Yearly billing toggle
  - Real-time payment status updates
  - Error handling and user feedback

- **Plan Management**
  - AuthContext syncs user plan from Firestore in real-time
  - Feature gating based on actual Firestore plan (not local state)
  - Automatic UI updates when plan changes

- **Billing Dashboard**
  - View current plan and features
  - See payment history
  - Payment transaction details

### ✅ Database Structure
- **Users Collection**: Added `plan`, `subscriptionStatus`, `lastPaymentDate` fields
- **Orders Collection**: Tracks Razorpay orders for verification
- **Payments Collection**: Records all successful payments

---

## Setup Instructions

### Step 1: Create Razorpay Account
1. Go to https://razorpay.com and sign up
2. Complete KYC verification for Pakistan (or your region)
3. Go to **Settings → API Keys**
4. You'll see:
   - **Key ID** (Public key) - use in frontend
   - **Key Secret** (Private key) - use in backend only

### Step 2: Configure Frontend Keys
Edit `.env.local`:
```env
VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_ACTUAL_KEY_ID
```

### Step 3: Configure Cloud Functions
Edit `functions/.env`:
```env
RAZORPAY_KEY_ID=rzp_live_YOUR_ACTUAL_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_ACTUAL_KEY_SECRET
```

### Step 4: Deploy Cloud Functions
```bash
cd functions
firebase deploy --only functions
```

This deploys the payment functions to Firebase. Note the deployment URLs for later.

### Step 5: Get Your Cloud Function URLs
After deployment, you'll see URLs like:
```
https://asia-south1-campuskart-1545d.cloudfunctions.net/initiatePayment
https://asia-south1-campuskart-1545d.cloudfunctions.net/verifyPayment
https://asia-south1-campuskart-1545d.cloudfunctions.net/razorpayWebhook
```

These are already configured in the code, but adjust the region if needed.

### Step 6: Set Up Webhook (Optional but Recommended)
1. In Razorpay Dashboard, go to **Settings → Webhooks**
2. Click **Add Webhook**
3. Add the webhook URL:
   ```
   https://asia-south1-campuskart-1545d.cloudfunctions.net/razorpayWebhook
   ```
4. Select these events:
   - `payment.authorized`
   - `payment.failed`
5. Copy the **Webhook Secret** and add to `functions/.env`:
   ```env
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   ```
6. Redeploy functions: `firebase deploy --only functions`

### Step 7: Test Payment Flow
1. Run the development server: `npm run dev`
2. Create an account and log in
3. Click "Upgrade" on any paid plan
4. Use Razorpay test cards:
   - **Success Card**: `4111111111111111` (any future date, any CVV)
   - **Failed Card**: `4000000000000002`
5. Complete the payment
6. Check Dashboard → Billing to see the transaction

---

## Payment Test Cards

### Testing with Razorpay (Test Mode)
When your Razorpay account is in test mode, use:

**Successful Payment:**
- Card: `4111 1111 1111 1111`
- Expiry: Any future date (MM/YY)
- CVV: Any 3 digits

**Failed Payment:**
- Card: `4000 0000 0000 0002`

**Pakistan-specific UPI Test:**
- UPI: `success@razorpay`

### Production Cards
Once you switch to live mode, real Visa/Mastercard payments will work.

---

## Database Schema

### Users Collection Updates
```javascript
{
  email: "user@example.com",
  displayName: "John Doe",
  plan: "pro", // "free", "pro", "premium"
  subscriptionStatus: "active", // "active", "inactive"
  lastPaymentDate: Timestamp,
  razorpayPaymentId: "pay_xxxxx"
}
```

### Orders Collection
```javascript
{
  userId: "uid123",
  planId: "pro",
  billingCycle: "monthly", // "monthly" or "yearly"
  amount: 99900, // in paise
  status: "completed", // "initiated", "completed", "failed"
  razorpayOrderId: "order_xxxxx",
  userEmail: "user@example.com",
  createdAt: Timestamp,
  expiresAt: Timestamp
}
```

### Payments Collection
```javascript
{
  userId: "uid123",
  razorpayOrderId: "order_xxxxx",
  razorpayPaymentId: "pay_xxxxx",
  planId: "pro",
  amount: 99900,
  billingCycle: "monthly",
  status: "success",
  createdAt: Timestamp
}
```

---

## Plan Pricing

| Plan | Monthly | Yearly | Features |
|------|---------|--------|----------|
| **Free** | $0 | - | 1 Resume, 2 Templates, PDF Download |
| **Pro** | $9.99 | $79.99 | 10 Resumes, AI Assistant, ATS Checker, Premium Templates |
| **Premium** | $19.99 | $149.99 | Unlimited Resumes, Priority Support, Custom Branding |

**Amounts in paise:**
- Pro Monthly: 99900 (₹999 or $9.99)
- Pro Yearly: 799900 (₹7999 or $79.99)
- Premium Monthly: 199900 (₹1999 or $19.99)
- Premium Yearly: 1499900 (₹14999 or $149.99)

(Note: Adjust amounts based on your actual pricing)

---

## Feature Gating

Features are now locked behind plans using the user's actual Firestore plan:

- **Free Plan:**
  -  ✗ AI Writing Assistant
  - ✗ ATS Score Checker
  - ✗ Premium Templates
  - ✗ Cover Letter Builder
  - ✗ Job Tracker
  - ✗ Cloud Storage

- **Pro Plan:**
  - ✓ AI Writing Assistant
  - ✓ ATS Score Checker
  - ✓ 6 Premium Templates
  - ✓ Cover Letter Builder
  - ✓ Job Tracker
  - ✓ Cloud Storage

- **Premium Plan:**
  - ✓ All Pro features
  - ✓ Unlimited resumes
  - ✓ Priority support
  - ✓ Custom branding

---

## Security Considerations

✅ **What's Secure:**
- Razorpay payment signature verification on backend
- Private keys stored only in Cloud Functions
- User plan synced from Firestore (source of truth)
- No payment details stored in frontend
- HTTPS enforced in production

⚠️ **Important:**
- Never commit `.env` files to git (added to `.gitignore`)
- Never log or expose Razorpay secret keys
- Always verify signatures on the backend
- Use HTTPS only in production

---

## Troubleshooting

### Payment Modal Not Opening
- Check if Razorpay script loaded: Open browser devtools → Network tab
- Verify `VITE_RAZORPAY_KEY_ID` is set correctly in `.env.local`
- Ensure user is logged in

### Payment Fails
- Check Cloud Functions logs: `firebase functions:log`
- Verify Razorpay API KYs are correct
- Ensure Firebase has permissions to update Firestore

### Plan Not Updating
- Check Firestore `users` collection → user document
- Verify payment was marked as `success` in `payments` collection
- Check browser console for errors
- Try refreshing the page (AuthContext syncs plan on load)

### Test Payment Issues
- Ensure Razorpay account is in **Test Mode**
- Use correct test card numbers
- Check if order was created in Razorpay Dashboard

---

## Next Steps

1. ✅ Complete Razorpay setup above
2. ✅ Deploy Cloud Functions
3. ✅ Configure webhooks for real-time updates
4. ✅ Test with test cards
5. ✅ Switch Razorpay to Live Mode for real payments
6. Consider: Add email notifications for successful payments
7. Consider: Add payment receipt downloads
8. Consider: Implement subscription cancellation flow

---

## Support

Need help?
- Razorpay Docs: https://razorpay.com/docs
- Firebase Docs: https://firebase.google.com/docs
- GitHub Issues: [Your repo]

Enjoy your new payment integration! 🎉
