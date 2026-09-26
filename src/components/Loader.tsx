"use client";

import { motion } from "framer-motion";

/**
 * Intro overlay. The fade-out is driven by CSS so the page stays usable even
 * if JavaScript never hydrates; React only unmounts it afterwards.
 */
export default function Loader() {
  return (
    <div className="intro-loader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink">
      <img
        src="/images/svg/logo.svg"
        alt=""
        width={78}
        height={78}
        className="animate-pulse"
      />
      <p className="display mt-6 text-lg uppercase tracking-[0.35em] text-cream/70">
        Kerith Travels
      </p>

      <span className="relative mt-6 block h-px w-52 overflow-hidden bg-white/15">
        <motion.span
          className="absolute inset-y-0 left-0 block w-full origin-left bg-gradient-to-r from-amber to-coral"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </span>
    </div>
  );
}
