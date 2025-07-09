// src/Components/Payment/PaymentGateway.jsx

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { SiPhonepe } from "react-icons/si";
import TermsModal from "../Subscribe/TermsConditions/TermsModal";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import VideoBg from "../../assets/bg1.mp4";
import { initiatePhonePePayment } from "../../services/paymentService";
import "./PaymentGateway.scss";

const PaymentGateway = () => {
  const location = useLocation();
  const { package: selectedPackage, quantity } = location.state || {};

  const totalAmount = selectedPackage ? selectedPackage.priceINR * quantity : 0;

  const [method, setMethod] = useState("phonepe");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!agreedToTerms || !selectedPackage) return;

    if (method === "phonepe") {
      try {
        const paymentResponse = await initiatePhonePePayment({
          amount: totalAmount,
          redirectUrl: `${window.location.origin}/payment/success`,
          name: data.name,
          email: data.email,
          address: data.address,
          packageName: selectedPackage.name,
          quantity,
          packageDetails: selectedPackage,
        });

        if (paymentResponse.redirectUrl) {
          window.location.href = paymentResponse.redirectUrl;
        } else {
          alert("PhonePe initiation failed.");
        }
      } catch (err) {
        alert("Something went wrong. Try again later.");
      }
      return;
    }

    alert("Please choose PhonePe as the payment method.");
  };

  if (!selectedPackage) {
    return <div className="payment-container">No package selected.</div>;
  }

  return (
    <div className="payment-container">
      <div className="videoBg">
        <video src={VideoBg} autoPlay loop muted playsInline preload="auto" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="payment-form">
        <h2 className="payment-title">Pay for {selectedPackage.name}</h2>

        <div className="payment-summary">
          <p><strong>Package:</strong> {selectedPackage.name}</p>
          <p><strong>Travelers:</strong> {quantity}</p>
          <p><strong>Total:</strong> ₹{totalAmount}</p>
        </div>

        <div className="payment-methods">
          {[{ type: "phonepe", label: "PhonePe / All Methods", icon: <SiPhonepe size={24} /> }].map((option) => (
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

          <input
            {...register("address", { required: "Address is required" })}
            placeholder="Address"
            className="input"
            style={{ marginTop: "0.5rem" }}
          />
          {errors.address && <p className="error">{errors.address.message}</p>}
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
