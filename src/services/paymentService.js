// src/services/paymentService.js
import axios from "axios";

export const initiatePhonePePayment = async ({
  amount,
  redirectUrl,
  name,
  email,
  address,
  packageName,
  quantity,
  packageDetails,
}) => {
  try {
    const response = await axios.post(`http://localhost:4000/api/checkout/initiate`, {
      amount,
      redirectUrl,
      udf1: name,
      udf2: email,
      udf3: address,
      packageName,
      quantity,
      packageDetails,
    });

    return response.data;
  } catch (error) {
    console.error("PhonePe initiation error:", error);
    throw error;
  }
};
