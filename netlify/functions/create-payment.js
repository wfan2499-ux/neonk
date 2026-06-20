// Netlify Function — creates a Moyasar payment invoice
// POST { amount, currency, description, productName }
// Returns { url } — redirect the customer here

exports.handler = async (event) => {
  // Only accept POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const MOYASAR_KEY = process.env.MOYASAR_SECRET_KEY;
  if (!MOYASAR_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Payment not configured" }),
    };
  }

  try {
    const { amount, currency, description, productName } = JSON.parse(event.body);

    // Create Moyasar invoice (hosted payment page)
    const response = await fetch("https://api.moyasar.com/v1/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${MOYASAR_KEY}:`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: amount, // in halalas (e.g. 39900 = 399 SAR)
        currency: currency || "SAR",
        description: description || `طلب ${productName} - Neon-K`,
        callback_url: `${event.headers.origin || "https://neon-k.sa"}/payment-success`,
      }),
    });

    const invoice = await response.json();

    if (!response.ok) {
      console.error("Moyasar error:", invoice);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: invoice.message || "Payment creation failed" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ url: invoice.url }),
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
