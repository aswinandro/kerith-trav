"use client";

import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const TERMS = [
  "A 25% advance confirms your seat; the balance is due 21 days before departure.",
  "Free date changes up to 30 days before departure on most packages.",
  "Travel insurance is included on trips valued above ₹75,000 per person.",
  "Passports must be valid for at least six months beyond your return date.",
  "We follow a strict no-hidden-fees policy — every cost is shown at checkout.",
];

export default function TermsModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Terms and conditions"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-[26px] border border-white/12 bg-ink-3 p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close terms"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-cream transition hover:border-amber hover:text-amber-2"
        >
          <FiX size={16} />
        </button>

        <h3 className="display text-2xl text-cream">Terms & conditions</h3>
        <ul className="mt-5 space-y-4 text-sm leading-relaxed text-cream/65">
          {TERMS.map((t) => (
            <li key={t} className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
              {t}
            </li>
          ))}
        </ul>

        <button type="button" onClick={onClose} className="btn btn-primary mt-6 w-full">
          Understood
        </button>
      </motion.div>
    </div>
  );
}
