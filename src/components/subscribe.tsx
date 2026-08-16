"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Subscribe() {
  const [showTerms, setShowTerms] = useState(false);
  const router = useRouter();

  const handleOpenTerms = useCallback(() => setShowTerms(true), []);
  const handleCloseTerms = useCallback(() => setShowTerms(false), []);

  return (
    <section
      className="py-12 bg-gray-900 relative overflow-x-hidden"
      style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #141413 100%)" }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-96"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.2 }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          fill="none"
        >
          <rect width="100" height="100" fill="url(#grad3)" />
          <defs>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#1a1a2e" />
              <stop offset="100%" style="stop-color:#141413" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <div className="secContainer grid max-w-4xl mx-auto py-20">
        <div className="textDiv">
          <h4 className="text-2xl font-bold text-white mb-4">
            Start your journey with us
          </h4>
          <p className="text-white/60 text-lg mb-6">
            We offer personalised itineraries tailored to individual preferences and interests.
          </p>
          <div className="buttons flex gap-4">
            <motion.button
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="btn bg-orange-500 text-white px-6 py-3 rounded"
              type="button"
              onClick={() => router.push("/")}
            >
              Start Here
            </motion.button>

            <motion.button
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="btn border border-white/20 px-6 py-3 rounded"
              type="button"
              onClick={handleOpenTerms}
              aria-haspopup="dialog"
              aria-controls="terms-modal"
            >
              Terms & Conditions
            </motion.button>
          </div>
        </div>

        <motion.img
          src="/placeholder.svg?height=400&width=600"
          alt="Start your journey with us"
          loading="lazy"
          className="subscribeImage"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.3,
          }}
        />
      </div>

      {showTerms && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setShowTerms(false)}
        >
          <div
            className="modal-content"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <h3>Terms & Conditions</h3>
            <p>Please review the terms and conditions...</p>
            <button className="btn" onClick={handleCloseTerms}>Close</button>
          </div>
        </motion.div>
      )}
    </section>
  );
}