const stripe = require('../config/stripeClient');
const orderService = require('../services/order-services/findGetDeleteOrder');

const createStripePaymentIntent = async (orderId) => {
  try {
    const order = await orderService.findOrderById(orderId);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.totalPrice * 100, // Amount in smallest currency unit
      currency: 'GBP', // Change to your preferred currency
      payment_method_types: ['card'],
      metadata: {
        order_id: order._id,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    console.error('Error creating Stripe payment intent:', error);
    throw new Error(error.message);
  }
};

module.exports = {
  createStripePaymentIntent,
};
