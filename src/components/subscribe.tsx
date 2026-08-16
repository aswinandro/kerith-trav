import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "next/navigation";

export default function Subscribe() {
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();

  const handleOpenTerms = useCallback(() => setShowTerms(true), []);
  const handleCloseTerms = useCallback(() => setShowTerms(false), []);

  return (
    <section className="subscribe section container" role="region" aria-label="Subscribe Section">
      <div className="secContainer grid">
        <motion.img
          src="/placeholder.svg?height=400&width=600"
          alt="Start your journey with us"
          loading="lazy"
          className="subscribeImage"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        />

        <div className="textDiv">
          <h4 data-aos="fade-up">Best way to start your journey</h4>
          <p data-aos="fade-up" data-aos-delay="100">
            We offer personalised itineraries tailored to individual preferences and interests.
          </p>
          <div className="buttons flex">
            <motion.button
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, y: 0 }}}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="btn"
              type="button"
              onClick={() => navigate("/")}
            >
              Start Here
            </motion.button>

            <motion.button
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, y: 0 }}}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="btn"
              type="button"
              onClick={handleOpenTerms}
              aria-haspopup="dialog"
              aria-controls="terms-modal"
            >
              Terms & Conditions
            </motion.button>
          </div>
        </div>
      </div>

      {showTerms && (
        <motion.div
          className="modal-overlay"
          whileOpen={{ opacity: 1 }}
          whileClose={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setShowTerms(false)}
        >
          <div className="modal-content" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <h3>Terms & Conditions</h3>
            <p>Please review the terms and conditions...</p>
            <button className="btn" onClick={handleCloseTerms}>Close</button>
          </div>
        </motion.div>
      )}
    </section>
  );
}