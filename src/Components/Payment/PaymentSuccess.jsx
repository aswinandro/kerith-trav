import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import VideoBg from "../../assets/bg1.mp4";
import "./PaymentStatus.scss";

import { capturePayPalPayment } from "../../services/paypalPayment";

const Loader = () => (
  <div style={{ margin: "2rem auto", textAlign: "center" }}>
    <div
      style={{
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #3498db",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        animation: "spin 1s linear infinite",
        margin: "auto",
      }}
    />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
      }
    `}</style>
  </div>
);

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState("processing"); // 'processing' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [hasCaptured, setHasCaptured] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setErrorMessage("Missing PayPal token in URL.");
      return;
    }

    if (hasCaptured) return;

    const handleCapture = async () => {
      setHasCaptured(true);

      const result = await capturePayPalPayment(token);

      if (result.success) {
        console.log("✅ Payment captured:", result.data);
        setPaymentDetails(result.data); // Save full capture response to state
        setStatus("success");
      } else {
        console.error("❌ Capture failed:", result.error);

        if (result.error?.name === "ORDER_ALREADY_CAPTURED") {
          // Optionally, you might fetch order details here instead of assuming success
          setStatus("success");
        } else {
          setErrorMessage("Payment capture failed. Please contact support.");
          setStatus("error");
        }
      }
    };

    handleCapture();
  }, [searchParams, hasCaptured]);

  // Extract useful details safely
  const payerName =
    paymentDetails?.data?.payer?.name?.given_name &&
    paymentDetails?.data?.payer?.name?.surname
      ? `${paymentDetails.data.payer.name.given_name} ${paymentDetails.data.payer.name.surname}`
      : null;

  const payerEmail = paymentDetails?.data?.payer?.email_address || null;

  const capture =
    paymentDetails?.data?.purchase_units?.[0]?.payments?.captures?.[0] || null;

  const amount = capture?.amount?.value || null;
  const currency = capture?.amount?.currency_code || null;
  const captureId = capture?.id || null;

  return (
    <div className="payment-container">
      <div className="videoBg">
        <video src={VideoBg} autoPlay loop muted playsInline preload="auto" />
      </div>

      <motion.div
        className={`status-card ${status}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {status === "processing" && (
          <>
            <h2>Processing Payment...</h2>
            <Loader />
          </>
        )}

        {status === "success" && (
          <>
            <h2>Payment Successful 🎉</h2>
            <p>Thank you for your purchase! Your booking is confirmed.</p>

            {payerName && <p><strong>Payer:</strong> {payerName}</p>}
            {payerEmail && <p><strong>Email:</strong> {payerEmail}</p>}

            {amount && currency ? (
              <p>
                <strong>Amount Captured:</strong> {amount} {currency}
              </p>
            ) : (
              <p>Payment details not available.</p>
            )}

            {captureId && (
              <p>
                <strong>Capture ID:</strong> {captureId}
              </p>
            )}

            <button onClick={() => navigate("/")}>Go to Home</button>
          </>
        )}

        {status === "error" && (
          <>
            <h2>Payment Failed ❌</h2>
            <p>{errorMessage}</p>
            <button onClick={() => navigate("/")}>Try Again</button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
