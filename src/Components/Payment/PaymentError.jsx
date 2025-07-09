// src/Components/Payment/PaymentError.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import VideoBg from "../../assets/bg1.mp4";
import "./PaymentStatus.scss";

const PaymentError = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-container">
      <div className="videoBg">
        <video src={VideoBg} autoPlay loop muted playsInline preload="auto" />
      </div>

      <motion.div
        className="status-card error"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2>Payment Failed ❌</h2>
        <p>Something went wrong. Please try again or contact support.</p>
        <button onClick={() => navigate("/")}>Close</button>
      </motion.div>
    </div>
  );
};

export default PaymentError;
