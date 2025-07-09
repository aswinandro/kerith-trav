// src/Components/Payment/PaymentSuccess.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import VideoBg from "../../assets/bg1.mp4";
import "./PaymentStatus.scss";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-container">
      <div className="videoBg">
        <video src={VideoBg} autoPlay loop muted playsInline preload="auto" />
      </div>

      <motion.div
        className="status-card success"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2>Payment Successful 🎉</h2>
        <p>Thank you for your purchase! Your booking is confirmed.</p>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
