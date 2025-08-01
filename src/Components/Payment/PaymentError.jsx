import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import VideoBg from "../../assets/bg1.mp4";
import "./PaymentStatus.scss";

const PaymentError = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Something went wrong. Please try again or contact support.");

  useEffect(() => {
    const token = searchParams.get("token");
    const errorDescription = searchParams.get("error_description");

    if (!token) {
      setMessage("Payment was not initiated or was cancelled before completion.");
    }

    if (errorDescription) {
      setMessage(decodeURIComponent(errorDescription));
    }
  }, [searchParams]);

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
        <p>{message}</p>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </motion.div>
    </div>
  );
};

export default PaymentError;
