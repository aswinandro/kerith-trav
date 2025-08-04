import axios from "axios";

// const BASE_URL = "http://127.0.0.1:8787"; // Change this to your backend URL as needed
const BASE_URL = "https://paypal-cloudfare-worker.travelkerith.workers.dev";
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
    payer: {
      email_address: email,
      name: {
        given_name: name?.split(" ")[0] || "",
        surname: name?.split(" ")[1] || "",
      },
    },
    application_context: {
      brand_name: "Kerith Travels & Tourism",
      payment_method: {
        payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
      },
      landing_page: "BILLING",
      shipping_preference: "NO_SHIPPING",
      user_action: "PAY_NOW",
      // return_url: "http://localhost:5173/payment/review",
      // cancel_url: "http://localhost:5173/payment/error",
      return_url: "https://kerithtravel.com/payment/review",
      cancel_url: "https://kerithtravel.com/payment/error",
    },
    purchase_units: [
      {
        invoice_id: `INV-${Date.now()}`,
        note_to_payer: "Thank you for booking with Kerith Travels!",
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
            quantity: quantity?.toString() || "1",
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
    const response = await axios.post(`${BASE_URL}/payment/create`, payload);
    const approvalUrl = response.data?.links?.find(link => link.rel === "approve")?.href;
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

// Idempotent call to backend capture
export const capturePayPalPayment = async (orderId) => {
  try {

    const res = await axios.post(`${BASE_URL}/payment/capture`, { orderId });
    return { success: true, data: res.data };
  } catch (error) {
    const errorData = error.response?.data || {};
    return { success: false, error: errorData };
  }
};

export const getPayPalOrderDetails = async (orderId) => {
  try {
    const res = await axios.get(`${BASE_URL}/payment/order/${orderId}`);
    return { success: true, data: res.data };
  } catch (error) {
    const errorData = error.response?.data || {};
    return { success: false, error: errorData };
  }
};
