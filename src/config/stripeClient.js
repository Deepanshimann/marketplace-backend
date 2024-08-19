const Stripe = require('stripe');

// Directly embed your secret key here (replace 'your_secret_key_here' with your actual key)
const stripeSecretKey = 'sk_test_51PpJQtRsZlg6HjHGuLAigOMFCNEVjhLVyPImSTnwuyUSY1LtY48m1MrWTEjlJSbPpuNyLNtHCXatTWXEY8ZHcu7B00OqcCfnEl';

const stripe = new Stripe(stripeSecretKey);

module.exports = stripe;
