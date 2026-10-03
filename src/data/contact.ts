/** Single source of truth for every contact detail shown on the site. */
export const CONTACT = {
  /** WhatsApp / phone (same line) — digits only, no `+`, for wa.me links. */
  whatsappNumber: "971541896965",
  phoneDisplay: "+971 54 1896 965",
  phoneHref: "tel:+971541896965",
  email: "info@kerithtravel.com",
  emailHref: "mailto:info@kerithtravel.com",
  /** Registered/primary office. */
  address: "Madinat Zayed, Abu Dhabi, United Arab Emirates",
  hours: "Mon–Sat, 9:30am – 7:00pm GST",
} as const;

/** Every location we operate from. */
export const OFFICES = [
  "Dubai",
  "Sharjah",
  "Ajman",
  "Abu Dhabi",
  "India",
] as const;

/** OpenStreetMap embed centred on the Abu Dhabi office. */
export const OFFICE_MAP =
  "https://www.openstreetmap.org/export/embed.html?bbox=54.30%2C24.42%2C54.45%2C24.53&layer=mapnik";

/** wa.me deep link, optionally prefilled with a message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${CONTACT.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
