"use client";

import { motion } from "framer-motion";
import { FiMessageCircle, FiPhone } from "react-icons/fi";

const ACTIONS = [
  {
    href: "https://wa.me/919486781846",
    label: "Chat on WhatsApp",
    icon: FiMessageCircle,
    external: true,
    className:
      "bg-gradient-to-br from-jade to-emerald-600 text-ink shadow-[0_14px_34px_-14px_rgba(143,224,143,0.9)]",
  },
  {
    href: "tel:+919486781846",
    label: "Call us",
    icon: FiPhone,
    external: false,
    className:
      "bg-gradient-to-br from-amber to-coral text-ink shadow-[0_14px_34px_-14px_rgba(255,138,30,0.9)]",
  },
];

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col gap-3">
      {ACTIONS.map(({ href, label, icon: Icon, external, className }) => (
        <motion.a
          key={label}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          aria-label={label}
          whileHover={{ scale: 1.12, x: -6 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className={`group flex items-center gap-3 rounded-full p-4 sm:p-3.5 ${className}`}
        >
          <Icon size={20} />
          <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold tracking-wide transition-all duration-500 group-hover:max-w-[9rem] sm:inline">
            {label}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
