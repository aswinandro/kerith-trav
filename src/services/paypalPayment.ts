const BASE_URL = "https://phonepe-backend-njty.onrender.com/api/paypal";

/**
 * PayPal REST helpers.
 * Endpoints are relative to the same backend that serves `/api/paypal/payment`.
 * Adjust the three paths below if your worker exposes different routes.
 */
export async function getPayPalOrderDetails(orderId: string) {
  const response = await fetch(`${BASE_URL}/order/${orderId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load PayPal order (${response.status})`);
  }

  return response.json();
}

export async function capturePayPalPayment(orderId: string) {
  const response = await fetch(`${BASE_URL}/order/${orderId}/capture`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to capture PayPal payment (${response.status})`);
  }

  return response.json();
}
