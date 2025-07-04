// FloatingButtons.js
import React from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import "./FloatingButtons.css";

const FloatingButtons = () => {
  return (
    <div className="floating-buttons">
      <a
        href="https://wa.me/919486781846"
        className="whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        title="Message us on WhatsApp"
      >
        <FaWhatsapp className="icon" />
      </a>

      <a href="tel:+919486781846" className="phone" title="Call us">
        <FaPhone className="icon" />
      </a>
    </div>
  );
};

export default FloatingButtons;
