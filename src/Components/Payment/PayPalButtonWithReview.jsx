import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getPayPalOrderDetails, capturePayPalPayment } from "../../services/paypalPayment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./PayPalReviewCapture.scss";
import VideoBg from "../../assets/bg1.mp4";
import Logo from "../../assets/logo.png";
import { sendPaymentConfirmationEmail } from '../../services/mail';
import { toast } from 'react-hot-toast';

function SkeletonLoader() {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-title"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line short"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line short"></div>
      <div className="skeleton-block"></div>
    </div>
  );
}

export default function PayPalReviewAndCapture() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("token");
  const [reviewData, setReviewData] = useState(null);
  const [captured, setCaptured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const receiptRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!orderId) throw new Error("Missing orderId");
        const response = await getPayPalOrderDetails(orderId);
        const details = response?.data;
        if (details) setReviewData(details);
        else throw new Error("Invalid PayPal order data");
      } catch (err) {
        console.error("Failed to fetch PayPal order details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [orderId]);

  const handleCapture = async () => {
    setIsCapturing(true);
    try {
      await capturePayPalPayment(orderId);
      toast.success('Ordered successfully!');
      setCaptured(true);

      // Prepare the email data
      const emailData = {
        customerEmail: payer?.email_address || "",
        orderId: id,
        orderDetailsHTML: receiptRef.current?.outerHTML || "<p>Receipt details unavailable</p>",
      };

      // Call the email sending service
      await sendPaymentConfirmationEmail(emailData);

    //   alert("📧 Confirmation email sent!");
    } catch (err) {
      console.error("Error during capture or email sending:", err);
    //   toast.error("❌ Payment capture or email sending failed.");
    } finally {
      setIsCapturing(false);
    }
  };

  const handleDownloadPDF = async () => {
    const input = receiptRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Kerith_Receipt.pdf");
  };

  const {
    id,
    intent,
    status,
    create_time,
    payer,
    payment_source,
    purchase_units = [],
  } = reviewData || {};

  const purchase = purchase_units[0] || {};
  const item = purchase?.items?.[0] || {};
  const payee = purchase?.payee || {};
  const brand = payee?.display_data?.brand_name;
  const shipping = purchase?.shipping?.address || {};

  return (
    <div className="payment-container">
      <div className="videoBg">
        <video autoPlay muted loop>
          <source src={VideoBg} type="video/mp4" />
        </video>
      </div>

      <div
        className={`status-card ${isCapturing ? "animating-details" : ""}`}
        ref={receiptRef}
      >
        <div className="watermark">
          <img src={Logo} alt="watermark" />
        </div>

        <div className="header">
          <img src={Logo} alt="Logo" className="logo" />
          <div className="title">
            <h1>Kerith Travel & Tourism</h1>
            <p className="slogan">Travel - Secure. Simple. Seamless.</p>
          </div>
        </div>

        {loading ? (
          <SkeletonLoader />
        ) : !reviewData ? (
          <>
            <h2>Error</h2>
            <p>Unable to retrieve order details.</p>
          </>
        ) : (
          <>
            <p className="section-title">Review Payment Details</p>

            <p><strong>Order ID:</strong> {id}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Created:</strong> {new Date(create_time).toLocaleString()}</p>

            <hr />

            <p><strong>Name:</strong> {payer?.name?.given_name} {payer?.name?.surname}</p>
            <p><strong>Email:</strong> {payer?.email_address}</p>
            <p><strong>Country:</strong> {payer?.address?.country_code}</p>
            <p><strong>Account Status:</strong> {payment_source?.paypal?.account_status}</p>

            <hr />

            <p><strong>Item:</strong> {item?.name}</p>
            <p><strong>Description:</strong> {item?.description}</p>
            <p><strong>Price:</strong> {item?.unit_amount?.value} {item?.unit_amount?.currency_code}</p>

            <hr />

            <p><strong>Total:</strong> {purchase?.amount?.value} {purchase?.amount?.currency_code}</p>
            <p><strong>Invoice ID:</strong> {purchase?.invoice_id}</p>
            {brand && <p><strong>With ❤️ from </strong> {brand}</p>}

            {Object.keys(shipping).length > 0 && (
              <>
                <hr />
                <p><strong>Shipping:</strong><br />
                  {shipping.address_line_1}<br />
                  {shipping.admin_area_2}, {shipping.admin_area_1}<br />
                  {shipping.postal_code}, {shipping.country_code}
                </p>
              </>
            )}

            {!captured ? (
              <button
                className={`capture-btn ${isCapturing ? "loading" : ""}`}
                onClick={handleCapture}
                disabled={isCapturing}
              >
                {isCapturing ? (
                  <div className="loader"></div>
                ) : (
                  "Confirm Payment"
                )}
              </button>
            ) : (
              <>
                <h4 className="success-text">✅ Payment Completed</h4>
                <button className="pdf-btn" onClick={handleDownloadPDF}>
                  Download Receipt PDF
                </button>
                <button className="home-btn" onClick={() => navigate("/")}>
                  Return to Home
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
