import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // Ensure Node.js runtime

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  console.log("Webhook received"); // Add logging

  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  if (!sig || !webhookSecret) {
    console.error("Missing signature or webhook secret");
    return NextResponse.json(
      { error: "Missing signature or webhook secret" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const buf = await req.arrayBuffer();
    const rawBody = Buffer.from(buf);

    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);

    console.log("Webhook event constructed:", event.type); // Add logging
  } catch (err) {
    console.error("Error verifying webhook signature:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      console.log("Processing checkout.session.completed event"); // Add logging

      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_details?.email;

      // Send email to the customer
      if (customerEmail) {
        console.log(`Customer email: ${customerEmail}`); // Add logging
        // Replace this with your email sending logic
        await sendEmailToCustomer(customerEmail);
      } else {
        console.log("Customer email not found");
      }

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({ received: true }, { status: 200 });
}

// Function to send email
async function sendEmailToCustomer(email: string) {
  console.log(`Sending email to ${email}`); // Add logging

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Gmail app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thank you for your purchase!",
    text: "We appreciate your business and hope you enjoy your purchase.",
    html: "<p>We appreciate your business and hope you enjoy your purchase.</p>",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
