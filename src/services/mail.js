// const BASE_URL = 'http://127.0.0.1:8787';
const BASE_URL = 'https://paypal-cloudfare-worker.travelkerith.workers.dev';

export async function sendPaymentConfirmationEmail(data) {
  const response = await fetch(`${BASE_URL}/send/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: data.customerEmail,
      subject: `Payment Confirmation - Order ${data.orderId}`,
      details: { html: data.orderDetailsHTML }, // wrapped in object as you suggested
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Email send failed: ${errorText}`);
  }

  return await response.json();
}
