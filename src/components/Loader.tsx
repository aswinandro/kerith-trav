"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          <img
            src="/images/svg/logo.svg"
            alt=""
            width={78}
            height={78}
            className="animate-pulse"
          />
          <p className="display mt-6 text-lg tracking-[0.35em] text-cream/70 uppercase">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
