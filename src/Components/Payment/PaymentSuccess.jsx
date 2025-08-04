import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import VideoBg from "../../assets/bg1.mp4";
import { getPayPalOrderDetails } from "../../services/paypalPayment";
import "./PaymentStatus.scss";

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

  const [status, setStatus] = useState("processing");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setErrorMessage("Missing PayPal token in URL.");
      return;
    }

    const fetchDetails = async () => {
      const result = await getPayPalOrderDetails(token);

      if (result.success) {
        setOrderDetails(result.data);
        setStatus("success");
      } else {
        setErrorMessage("Failed to retrieve order details.");
        setStatus("error");
      }
    };

    fetchDetails();
  }, [searchParams]);

  const payer = orderDetails?.payer;
  const capture = orderDetails?.purchase_units?.[0]?.payments?.captures?.[0];

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

            {payer?.name && (
              <p>
                <strong>Payer:</strong> {payer.name.given_name} {payer.name.surname}
              </p>
            )}
            {payer?.email_address && (
              <p><strong>Email:</strong> {payer.email_address}</p>
            )}

            {capture?.amount && (
              <p>
                <strong>Amount Captured:</strong> {capture.amount.value} {capture.amount.currency_code}
              </p>
            )}

            {capture?.id && (
              <p><strong>Capture ID:</strong> {capture.id}</p>
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
