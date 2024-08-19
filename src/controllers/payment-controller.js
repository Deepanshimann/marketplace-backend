// payment-controller.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Ensure your secret key is securely provided
const orderService = require('../services/order-services/findGetDeleteOrder');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { id } = req.params; // Order ID
    const order = await orderService.findOrderById(id); // Fetch the order by ID

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.totalDiscountedPrice * 100, // Amount in cents
      currency: 'GBP', // Make sure currency is correct
      payment_method_types: ['card'], // Supported payment methods
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
