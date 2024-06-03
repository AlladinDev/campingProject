// This is your test secret API key.
const stripe = require('stripe')('sk_test_51PMnMyA1e3ycfevI2dNk79CRnn27TAaIJEEhbob8gCt7wANHNyEwoFDQfQyEMqQL5SsdWdCsEZVD5cAyndfP1ULW00tfIPkYzF');
const domain = 'http://localhost:5173'
const stripeCheckOutSession = async (req, res) => {
    const product = await stripe.products.create({
        name:'camping fees',
        description: 'Join us for an exciting camping trip!',
      });
      // Create a price for the product
      const price = await stripe.prices.create({
        unit_amount:req.body.tripPrice*100, // amount in cents
        currency: 'inr',
        product: product.id,
      });
  
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: price.id,
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${domain}/paymentsuccess/${req.body.tripId}`,
        cancel_url: `${domain}/paymentfailure`,
    });
  console.log("request bj is",req.body)
    res.json({url: session.url}) // <-- this is the changed line
};

module.exports = stripeCheckOutSession