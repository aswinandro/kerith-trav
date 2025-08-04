export const loadPayPalSdk = (clientId) => {
  return new Promise((resolve, reject) => {
    if (window.paypal) return resolve();

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=buttons,funding-eligibility&enable-funding=paylater,venmo,card,applepay,googlepay`;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;

    document.body.appendChild(script);
  });
};
