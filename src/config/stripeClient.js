const Stripe = require('stripe');
require('dotenv').config();

// Load Stripe secret key from environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = Stripe(stripeSecretKey);

module.exports = stripe;
