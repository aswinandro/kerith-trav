import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SiPhonepe, SiPaypal } from "react-icons/si";
import TermsModal from "../Subscribe/TermsConditions/TermsModal";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import VideoBg from "../../assets/bg1.mp4";
import {
  initiatePhonePePayment,
} from "../../services/paymentService";
import { initiatePayPalPayment } from "../../services/paypalPayment";
import { getExchangeRate } from "../../services/currencyService";
import "./PaymentGateway.scss";

const PaymentGateway = () => {
  const location = useLocation();
  const { package: selectedPackage, quantity } = location.state || {};

  // total amount in INR
  const totalINR = selectedPackage ? selectedPackage.priceINR * quantity : 0;

  const [method, setMethod] = useState("phonepe");
  const [currency, setCurrency] = useState("INR");
  const [convertedUSD, setConvertedUSD] = useState(null);

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const popularCurrencies = [
    "INR", "AED", "SAR", "KWD", "USD", "EUR", "GBP",
    "AUD", "CAD", "JPY", "CNY", "SGD", "THB", "ZAR", "PKR", "BDT"
  ];

  useEffect(() => {
    // If PayPal and currency selected is NOT USD, fetch conversion rate from currency -> USD
    if (method === "paypal") {
  getExchangeRate(currency, "USD").then((rate) => {
    if (rate) {
      const convertedAmount = (totalINR * rate).toFixed(2);
      setConvertedUSD(convertedAmount);
    } else {
      setConvertedUSD(null);
    }
  });
}

  }, [currency, method, totalINR]);

  const onSubmit = async (data) => {
    if (!agreedToTerms || !selectedPackage) return;

    if (method === "paypal") {
      if (!convertedUSD) {
        alert("Currency conversion not ready. Please wait.");
        return;
      }
    }

    const commonPayload = {
      amount: method === "paypal" ? Number(convertedUSD) : totalINR,
      name: data.name,
      email: data.email,
      address: data.address,
      quantity,
      packageName: selectedPackage.name,
      currency: method === "paypal" ? "USD" : "INR", // PayPal payments sent in USD always
    };

    try {
      if (method === "phonepe") {
        const merchantOrderId = `TX${Date.now()}`;
        const response = await initiatePhonePePayment({
          ...commonPayload,
          merchantOrderId,
          amount: totalINR * 100, // in paisa
          redirectUrl: `${window.location.origin}/api/payment/`,
          failureRedirectUrl: `${window.location.origin}`,
          packageDetails: JSON.stringify(selectedPackage),
        });

        if (response.redirectUrl) window.location.href = response.redirectUrl;
        else alert("PhonePe payment initiation failed.");
      } else if (method === "paypal") {
        const response = await initiatePayPalPayment(commonPayload);
        if (response.redirectUrl) window.location.href = response.redirectUrl;
        else alert("PayPal payment initiation failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    }
  };

  if (!selectedPackage) {
    return <div className="payment-container">No package selected.</div>;
  }

  const paymentMethods = [
    { type: "phonepe", label: "PhonePe / All Methods", icon: <SiPhonepe size={24} /> },
    { type: "paypal", label: "PayPal", icon: <SiPaypal size={24} /> },
  ];

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
          <p><strong>Total:</strong> ₹{totalINR}</p>
        </div>

        <div className="payment-methods">
          {paymentMethods.map((option) => (
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

        {/* Currency dropdown only for PayPal */}
        {method === "paypal" && (
          <div className="currency-select">
            <label>Select Currency:</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="input"
            >
              {popularCurrencies.map((cur) => (
                <option key={cur} value={cur}>{cur}</option>
              ))}
            </select>
          </div>
        )}

        {/* Show converted USD amount only for PayPal and non-USD currencies */}
        {method === "paypal" && currency !== "USD" && convertedUSD && (
          <p className="converted-amount">
            <strong>Converted Amount:</strong> ${convertedUSD} USD (Approx.)
          </p>
        )}

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
          Pay Now {method === "paypal" 
            ? convertedUSD ? `$${convertedUSD} USD` : "Calculating..." 
            : `₹${totalINR}`}
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
