export const renderPayPalQuickCheckout = (containerId, amountUSD, onApproveCallback) => {
  if (!window.paypal || !document.getElementById(containerId)) return;

  window.paypal.Buttons({
    style: {
      layout: "vertical",
      color: "gold",
      shape: "rect",
      label: "paypal",
    },
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: amountUSD,
              currency_code: "USD",
            },
          },
        ],
        application_context: {
          user_action: "PAY_NOW",
        },
      });
    },
    onApprove: (data, actions) => {
      return actions.order.capture().then(onApproveCallback);
    },
    onError: (err) => {
      console.error("PayPal Quick Checkout Error:", err);
      alert("Payment failed. Please try again.");
    },
  }).render(`#${containerId}`);
};
