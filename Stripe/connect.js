const Stripe = require('stripe');
export const stripe_api = Stripe(process.env.STRIPE_SECRET_KEY);

