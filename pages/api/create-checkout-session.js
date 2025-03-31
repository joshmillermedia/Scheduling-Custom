import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @route POST /api/create-checkout-session
 * @desc Create a Stripe Checkout session with custom metadata
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, start_date, end_date, selected_color } = req.body;

    if (!name || !phone || !start_date || !end_date || !selected_color) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, // e.g. 'price_1234abcd'
          quantity: 1,
        },
      ],
      metadata: {
        customer_name: name,
        customer_phone: phone,
        rental_start_date: start_date,
        rental_end_date: end_date,
        phone_color: selected_color,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
    });

    return res.status(200).json({ sessionId: session.id });
  } catch (err) {
    console.error('Stripe Checkout error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
