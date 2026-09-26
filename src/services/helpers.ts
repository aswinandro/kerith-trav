export type CheckoutMetadata = {
  notes?: string;
  userId?: string;
  cartId?: string;
  paymentPurpose?: string;
  sessionId?: string;
  utm?: Record<string, string>;
};

export function buildCheckoutPayload({
  name,
  email,
  phone,
  address,
  quantity,
  priceINR,
  metadata = {},
}: {
  name: string;
  email: string;
  phone?: string;
  address: string;
  quantity: number;
  priceINR: number;
  metadata?: CheckoutMetadata;
}) {
  const amount = quantity * priceINR;

  return {
    amount, // in rupees; backend converts to paise
    name,
    email,
    phone,
    address,
    quantity,
    notes: metadata.notes || "",
    userId: metadata.userId || "guest",
    cartId: metadata.cartId || "",
    paymentPurpose: metadata.paymentPurpose || "Travel Package Booking",
    platform: "web",
    sessionId: metadata.sessionId || "",
    userAgent: window.navigator.userAgent,
    ipAddress: "", // backend can fetch via req.ip
    meta: metadata.utm || {}, // optional UTM tags
  };
}
