import axios from "axios";

// Directly initiate payment; backend will handle getting token internally
export const initiatePhonePePayment = async ({
  merchantOrderId,
  amount,
  redirectUrl,
  name,
  email,
  address,
  quantity,
  // packageDetails,
  packageName,
}) => {
  try {
    const payload = {
      merchantOrderId,
      amount, // in paisa
      redirectUrl,
      name,
      email,
      address,
      quantity,
      packageName,
      // packageDetails,
    };

    const response = await axios.post(
      `https://phonepe-backend-njty.onrender.com/api/payment`,
      // `http://localhost:5000/api/payment`,
      payload
    );

    return response.data; // backend will return { redirectUrl, orderId, etc. }
  } catch (error) {
    console.error(
      "PhonePe payment initiation error:",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const checkPhonePeOrderStatus = async (merchantOrderId) => {
  const res = await axios.get(`https://phonepe-backend-njty.onrender.com/api/payment/${merchantOrderId}/status`);
  // const res = await axios.get(`http://localhost:5000/api/payment/${merchantOrderId}/status`);
  return res.data;
};


export const initiatePayPalPayment = async ({
  amount,
  name,
  email,
  address,
  quantity,
  packageName,
}) => {
  try {
    const payload = {
      amount,
      name,
      email,
      address,
      quantity,
      packageName,
    };

    const response = await axios.post(
      `https://phonepe-backend-njty.onrender.com/api/paypal/payment`, // Your PayPal-specific endpoint
      payload
    );

    return response.data; // expected: { redirectUrl }
  } catch (error) {
    console.error("PayPal payment initiation error:", error.response?.data || error.message);
    throw error;
  }
};