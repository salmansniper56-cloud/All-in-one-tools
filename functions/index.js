// Export all Cloud Functions
const paymentController = require('./paymentController');

module.exports = {
  ...paymentController
};
