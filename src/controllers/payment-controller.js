const paymentService = require('../services/payment-services');

const createPaymentIntent = async (req, res) => {
  try {
    const paymentIntentData = await paymentService.createStripePaymentIntent(req.params.id);
    return res.status(200).send(paymentIntentData);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { createPaymentIntent };
