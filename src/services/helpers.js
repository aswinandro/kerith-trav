export function buildCheckoutPayload({ name, email, phone, address, quantity, priceINR, metadata = {} }) {
  const amount = quantity * priceINR;

  return {
    amount, // in rupees; backend converts to paise
    name,
    email,
    phone,
    address,
    quantity,
    notes: metadata.notes || '',
    userId: metadata.userId || 'guest',
    cartId: metadata.cartId || '',
    paymentPurpose: metadata.paymentPurpose || 'Travel Package Booking',
    platform: 'web',
    sessionId: metadata.sessionId || '',
    userAgent: window.navigator.userAgent,
    ipAddress: '', // backend can fetch via req.ip
    meta: metadata.utm || {}, // optional UTM tags
  };
}
