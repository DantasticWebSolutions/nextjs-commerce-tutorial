import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import sendgrid from "@sendgrid/mail";

export const runtime = "nodejs"; // Ensure Node.js runtime

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

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
      // Retrieve the full session with expanded line items
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items.data.price.product"],
      });
      const customerEmail = fullSession.customer_details?.email;
      const customerName = fullSession.customer_details?.name;
      const lineItems = fullSession.line_items?.data;
      const totalAmount = fullSession.amount_total;
      const orderId = fullSession.id;
      // Send email to the customer
      if (customerEmail) {
        await sendEmailToCustomer(
          customerEmail,
          customerName,
          lineItems,
          totalAmount,
          orderId
        );
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
async function sendEmailToCustomer(
  email: string,
  name: string | null | undefined,
  lineItems: Stripe.LineItem[] | undefined,
  totalAmount: number | null | undefined,
  orderId: string | null | undefined
) {
  // Construct the order items list as HTML
  let itemsListHtml = "";
  if (lineItems && lineItems.length > 0) {
    itemsListHtml = "<ul>";
    for (const item of lineItems) {
      const product = item.price?.product as Stripe.Product;
      itemsListHtml += `<li>${item.quantity} x ${product.name} - €${(
        item.amount_total! / 100
      ).toFixed(2)}</li>`;
    }
    itemsListHtml += "</ul>";
  }
  // Email content
  const msg = {
    to: email,
    from: {
      email: process.env.SENDER_EMAIL as string, // Your verified sender email
      name: "Carmine Sembra Brooklyn", // Customize with your company name
    },
    subject: "Ordine completato",
    text: `Gentile ${name || "cliente"},
    \n\n<p>Il codice univoco per questo ordine è: ${orderId}</p>\n\nGrazie per il tuo acquisto e speriamo di vederti ai nostri eventi indossando i tuoi nuovi acquisti.\n\nDetagli ordine:\n${lineItems
      ?.map(
        (item) =>
          `${item.quantity} x ${
            (item.price?.product as Stripe.Product).name
          } - €${(item.amount_total! / 100).toFixed(2)}`
      )
      .join("\n")}\n\nCordiali saluti,\nCarmine Sembra Brooklyn`,
    html: `<p>Gentile ${name || "cliente"},</p>
    <p>Il codice univoco per questo ordine è: ${orderId}</p>
    <p>Grazie per il tuo acquisto e speriamo di vederti ai nostri eventi indossando i tuoi nuovi acquisti.</p>
    <h3>Dettagli ordine:</h3>
    ${itemsListHtml}
    <p><strong>Totale:</strong> €${((totalAmount ?? 0) / 100).toFixed(2)}</p>
    <p>Cordiali Saluti,<br>Carmine Sembra Brooklyn</p>`,
  };

  try {
    await sendgrid.send(msg);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
