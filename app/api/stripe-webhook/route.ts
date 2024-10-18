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
      const customerAddressLine = fullSession.customer_details?.address?.line1;
      const customerAddressCity = fullSession.customer_details?.address?.city;
      const customerAddressPostalCode =
        fullSession.customer_details?.address?.postal_code;

      // Send email to the customer
      if (customerEmail) {
        await sendEmailToCustomer(
          customerEmail,
          customerName,
          lineItems,
          totalAmount,
          orderId,
          customerAddressLine,
          customerAddressCity,
          customerAddressPostalCode
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
  orderId: string | null | undefined,
  customerAddressLine: string | null | undefined,
  customerAddressCity: string | null | undefined,
  customerAddressPostalCode: string | null | undefined
) {
  console.log(`Sending email to ${email}`); // Add logging

  // Truncate Session ID
  const truncatedSessionId = orderId?.slice(-20) ?? "";
  // Construct Customer Address
  const customerAddress = `${customerAddressLine ?? ""}, ${
    customerAddressCity ?? ""
  }, ${customerAddressPostalCode ?? ""}`;

  // Construct Order Items HTML
  let orderItemsHtml = "";
  if (lineItems && lineItems.length > 0) {
    for (const item of lineItems) {
      const product = item.price?.product as Stripe.Product;
      orderItemsHtml += `
       <tr>
        <td style="padding: 8px; color: #6b7280;">${product.name}</td>
        <td style="padding: 8px; font-weight: bold; color: #111827; text-align: right;">
          ${item.quantity} x €${((item.amount_total ?? 0) / 100).toFixed(2)}
        </td>
      </tr>
      `;
    }
  }

  // Format Total Amount
  const formattedTotalAmount = ((totalAmount ?? 0) / 100).toFixed(2);

  // Replace placeholders in the HTML template
  const emailHtml = `
  <!-- Email Template Start -->
  <section style="background-color: #ffffff; padding-top: 1rem; padding-bottom: 4rem; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; padding: 0 1rem;">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTibp508NO4CnYvITM-ht5S7RkI10YtErUKUA&s" alt="Carmine Sembra Brooklyn" style="width: 64px; height: 64px; margin: 1.5rem auto; display: block; color: #16a34a;" />
      <h2 style="font-size: 1.25rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem; text-align: center;">Pagamento completato!</h2>
      <p style="color: #6b7280; margin-bottom: 1.5rem; text-align: center;">
        Il tuo ordine
        <span style="font-weight: 500; color: #111827;">${truncatedSessionId}</span>
        sarà elaborato e spedito al più presto. La consegna è prevista entro 3-6 giorni lavorativi.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #e5e7eb; background-color: #f9fafb; padding: 1.5rem; margin-bottom: 1.5rem;">
        <tr>
          <td style="padding: 8px; color: #6b7280;">Codice identificativo</td>
          <td style="padding: 8px; font-weight: 500; color: #111827; text-align: right;">${truncatedSessionId}</td>
        </tr>
        <tr>
          <td style="padding: 8px; color: #6b7280;">Nome</td>
          <td style="padding: 8px; font-weight: 500; color: #111827; text-align: right;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; color: #6b7280;">Email</td>
          <td style="padding: 8px; font-weight: 500; color: #111827; text-align: right;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; color: #6b7280;">Indirizzo</td>
          <td style="padding: 8px; font-weight: 500; color: #111827; text-align: right;">${customerAddress}</td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #e5e7eb; background-color: #f9fafb; padding: 1.5rem; margin-bottom: 1.5rem;">
        <tr>
          <td colspan="2" style="padding-bottom: 16px;">
            <h2 style="font-size: 1.25rem; font-weight: bold; margin: 10px;">Riepilogo Ordine</h2>
          </td>
        </tr>
        ${orderItemsHtml}
        <tr>
          <td colspan="2" style="border-top: 1px solid #d1d5db; padding-top: 16px;"></td>
        </tr>
        <tr>
          <td style="padding: 8px; color: #6b7280;">Totale</td>
          <td style="padding: 8px; font-weight: bold; color: #111827; text-align: right;">€${formattedTotalAmount}</td>
        </tr>
      </table>
      <div style="text-align: center;">
        <a href="https://carmine-sembra-brooklyn.vercel.app/" style="background-color: #ff6600; color: #ffffff; padding: 0.625rem 1.25rem; border-radius: 0.375rem; text-decoration: none; font-weight: 500;">Continua a fare shopping</a>
      </div>
    </div>
  </section>
  <!-- Email Template End -->
  `;

  // Email content
  const msg = {
    to: email,
    from: {
      email: process.env.SENDER_EMAIL as string, // Your verified sender email
      name: "Carmine Sembra Brooklyn", // Customize with your company name
    },
    subject: "Ordine completato",
    html: emailHtml,
  };

  try {
    await sendgrid.send(msg);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
