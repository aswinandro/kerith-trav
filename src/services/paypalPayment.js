import axios from "axios";

/**
 * Initiates a PayPal payment by creating an order through your backend.
 * Redirects the user to PayPal's approval page.
 */
export const initiatePayPalPayment = async ({
  amount,
  name,
  email,
  address,
  quantity,
  packageName,
}) => {
  const payload = {
    intent: "CAPTURE",
    application_context: {
      payment_method: {
        payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
      },
      landing_page: "BILLING", // Use "BILLING" for guest checkout (no login page)
      shipping_preference: "NO_SHIPPING",
      user_action: "PAY_NOW",
      return_url: "https://kerithtravel.com//payment/success", // your success route
      cancel_url: "https://kerithtravel.com/payment/error",  // your cancel route
    },
    purchase_units: [
      {
        invoice_id: `INV-${Date.now()}`,
        amount: {
          currency_code: "USD",
          value: amount,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: amount,
            },
          },
        },
        items: [
          {
            name: packageName || "Package",
            description: `Purchase by ${name}`,
            quantity: quantity ? quantity.toString() : "1",
            unit_amount: {
              currency_code: "USD",
              value: amount,
            },
            category: "DIGITAL_GOODS",
            sku: "custom-sku-001",
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post("https://paypal-cloudfare-worker.travelkerith.workers.dev/payment/create", payload);
    const links = response.data?.links || [];

    console.log("PayPal order response:", response.data);

    // Look for the approval URL to redirect the user
    const approvalUrl =
      links.find((link) => link.rel === "approve")?.href ||
      links.find((link) => link.rel === "payer-action")?.href;

    if (approvalUrl) {
      window.location.href = approvalUrl;
    } else {
      console.error("No approval URL found in PayPal response.");
      alert("Payment failed. Please try again.");
    }
  } catch (error) {
    console.error(
      "Failed to initiate PayPal payment:",
      error?.response?.data || error.message
    );
    alert("Payment failed. Please try again.");
  }
};

export const capturePayPalPayment = async (orderId) => {
  try {
    const res = await axios.post("https://paypal-cloudfare-worker.travelkerith.workers.dev/payment/capture", {
      orderId,
    });

    return { success: true, data: res.data };
  } catch (error) {
    const errorData = error.response?.data || {};
    return { success: false, error: errorData };
  }
};
