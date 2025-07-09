// This is the main API wrapper to call your backend
export async function initiatePhonePePayment(details) {
  try {
    const response = await fetch('https://kerith-pay-server.onrender.com//api/checkout/initiate', {
          // const response = await fetch('http://localhost:4000/api/checkout/initiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Payment initiation failed');
    }

    return data; // { redirectUrl, merchantOrderId }
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw error;
  }
}
