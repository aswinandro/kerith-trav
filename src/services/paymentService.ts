const API_BASE = "https://phonepe-backend-njty.onrender.com/api";

async function postJson(path: string, payload: Record<string, unknown>) {
  const response = await fetch(`${API_BASE}${path}`, {
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

export const initiatePhonePePayment = async ({
  merchantOrderId,
  amount,
  redirectUrl,
  failureRedirectUrl,
  name,
  email,
  address,
  quantity,
  packageName,
  packageDetails,
}: {
  merchantOrderId: string;
  amount: number;
  redirectUrl: string;
  failureRedirectUrl?: string;
  name: string;
  email: string;
  address: string;
  quantity: number;
  packageName: string;
  packageDetails?: string;
}) => {
  try {
    return await postJson("/payment", {
      merchantOrderId,
      amount, // in paisa
      redirectUrl,
      failureRedirectUrl,
      name,
      email,
      address,
      quantity,
      packageName,
      packageDetails,
    });
  } catch (error) {
    console.error(
      "PhonePe payment initiation error:",
      error instanceof Error ? error.message : error
    );
    throw error;
  }
};

export const checkPhonePeOrderStatus = async (merchantOrderId: string) => {
  const response = await fetch(
    `${API_BASE}/payment/${encodeURIComponent(merchantOrderId)}/status`,
    { cache: "no-store" }
  );
  if (!response.ok) throw new Error(`Status check failed (${response.status})`);
  return response.json();
};

export const initiatePayPalPayment = async ({
  amount,
  name,
  email,
  address,
  quantity,
  packageName,
}: {
  amount: number;
  name: string;
  email: string;
  address: string;
  quantity: number;
  packageName: string;
}) => {
  try {
    return await postJson("/paypal/payment", {
      amount,
      name,
      email,
      address,
      quantity,
      packageName,
    });
  } catch (error) {
    console.error(
      "PayPal payment initiation error:",
      error instanceof Error ? error.message : error
    );
    throw error;
  }
};
