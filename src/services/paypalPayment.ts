const BASE_URL = "https://paypal-cloudfare-worker.travelkerith.workers.dev";

function appOrigin() {
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }
  return "https://kerithtravel.com";
}

async function postJson(path: string, payload: Record<string, unknown>) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(detail || `Request failed (${response.status})`);
  }

  return response.json();
}

export async function initiatePayPalPayment({
  amount,
  name,
  email,
  quantity,
  packageName,
}: {
  amount: number;
  name: string;
  email: string;
  address?: string;
  quantity?: number;
  packageName?: string;
}) {
  const value = Number(amount).toFixed(2);
  const [givenName, ...rest] = name.trim().split(" ");

  const data = await postJson("/payment/create", {
    intent: "CAPTURE",
    payer: {
      email_address: email,
      name: {
        given_name: givenName || "",
        surname: rest.join(" "),
      },
    },
    application_context: {
      brand_name: "Kerith Travels & Tourism",
      payment_method: {
        payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
      },
      landing_page: "LOGIN",
      shipping_preference: "NO_SHIPPING",
      user_action: "PAY_NOW",
      return_url: `${appOrigin()}/payment/review`,
      cancel_url: `${appOrigin()}/payment/error`,
    },
    purchase_units: [
      {
        invoice_id: `INV-${Date.now()}`,
        note_to_payer: "Thank you for booking with Kerith Travels!",
        amount: {
          currency_code: "USD",
          value,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value,
            },
          },
        },
        items: [
          {
            name: packageName || "Package",
            description: `Purchase by ${name}`,
            quantity: String(quantity ?? 1),
            unit_amount: {
              currency_code: "USD",
              value,
            },
            category: "DIGITAL_GOODS",
            sku: "custom-sku-001",
          },
        ],
      },
    ],
  });

  const approvalUrl = data?.links?.find(
    (link: { rel?: string; href?: string }) => link.rel === "approve"
  )?.href;

  if (!approvalUrl) {
    throw new Error("PayPal did not return an approval URL.");
  }

  return { redirectUrl: approvalUrl };
}

export async function getPayPalOrderDetails(orderId: string) {
  const response = await fetch(`${BASE_URL}/payment/order/${orderId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load PayPal order (${response.status})`);
  }

  return response.json();
}

export async function capturePayPalPayment(orderId: string) {
  const response = await fetch(`${BASE_URL}/payment/capture`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to capture PayPal payment (${response.status})`);
  }

  return response.json();
}
