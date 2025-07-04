// src/Components/Payment/PaymentGateway.jsx

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaCreditCard, FaUniversity } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import TermsModal from "../Subscribe/TermsConditions/TermsModal";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import VideoBg from "../../assets/bg1.mp4";
import "./PaymentGateway.scss";

const PaymentGateway = () => {
  const location = useLocation();
  const { package: selectedPackage, quantity } = location.state || {};

  const totalAmount = selectedPackage ? selectedPackage.priceINR * quantity : 0;

  const [method, setMethod] = useState("card");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!agreedToTerms || !selectedPackage) return;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: totalAmount * 100, // ₹ to paise
      currency: "INR",
      name: "Kerith Travel and Tourism",
      description: `Booking: ${selectedPackage.name}`,
      handler: function (response) {
        alert("Payment Successful!\n" + response.razorpay_payment_id);
      },
      prefill: {
        name: data.name,
        email: data.email,
      },
      theme: {
        color: "#ec5b24",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!selectedPackage) {
    return <div className="payment-container">No package selected.</div>;
  }

  return (
    <div className="payment-container">
      <div className="videoBg">
              <video
                src={VideoBg}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            </div>
      <form onSubmit={handleSubmit(onSubmit)} className="payment-form">
        <h2 className="payment-title">Pay for {selectedPackage.name}</h2>

        <div className="payment-summary">
          <p><strong>Package:</strong> {selectedPackage.name}</p>
          <p><strong>Travelers:</strong> {quantity}</p>
          <p><strong>Total:</strong> ₹{totalAmount}</p>
        </div>

        <div className="payment-methods">
          {[
            { type: "card", label: "Credit/Debit Card", icon: <FaCreditCard size={24} /> },
            { type: "netbanking", label: "Internet Banking", icon: <FaUniversity size={24} /> },
            { type: "phonepe", label: "PhonePe / UPI", icon: <SiPhonepe size={24} /> },
          ].map((option) => (
            <button
              type="button"
              key={option.type}
              onClick={() => setMethod(option.type)}
              className={`payment-option ${method === option.type ? "active" : ""}`}
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        <div className="payment-fields">
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Full Name"
            className="input"
          />
          {errors.name && <p className="error">{errors.name.message}</p>}

          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/, message: "Invalid email format" },
            })}
            placeholder="Email"
            className="input"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          {method === "card" && (
            <>
              <input
                {...register("cardNumber", {
                  required: "Card number required",
                  minLength: { value: 16, message: "Must be 16 digits" },
                })}
                placeholder="Card Number"
                className="input"
              />
              {errors.cardNumber && <p className="error">{errors.cardNumber.message}</p>}
            </>
          )}

          {method === "netbanking" && (
            <select {...register("bank", { required: "Please select a bank" })} className="input">
              <option value="">Select Bank</option>
              <option value="SBI">SBI</option>
              <option value="ICICI">ICICI</option>
              <option value="HDFC">HDFC</option>
            </select>
          )}

          {method === "phonepe" && (
            <>
              <input
                {...register("upi", {
                  required: "UPI ID required",
                  pattern: { value: /^[\w.-]+@[\w]+$/, message: "Invalid UPI ID" },
                })}
                placeholder="UPI ID (e.g., name@upi)"
                className="input"
              />
              {errors.upi && <p className="error">{errors.upi.message}</p>}
            </>
          )}
        </div>

        <div className="terms-section">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
          />
          <p>
            I agree to the{" "}
            <button type="button" onClick={() => setShowTermsModal(true)}>
              Terms & Conditions
            </button>
          </p>
        </div>

        <button
          disabled={!agreedToTerms}
          type="submit"
          className={`submit-btn ${!agreedToTerms ? "disabled" : ""}`}
        >
          Pay Now ₹{totalAmount}
        </button>
      </form>

      <AnimatePresence>
        {showTermsModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="modal-overlay"
          >
            <TermsModal onClose={() => setShowTermsModal(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentGateway;
