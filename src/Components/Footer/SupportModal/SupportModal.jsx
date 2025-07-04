// components/Subscribe/SupportModal.js
import React from "react";
import "./SupportModal.css";

const SupportModal = ({ onClose }) => {
  return (
    <div className="support-modal-overlay">
      <div className="support-modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Contact Support</h2>
        <div className="support-details">
          <p>
            <strong>Phone: </strong>
            <a href="tel:+919486781846">+91 9486781846</a>
          </p>
          <p>
            <strong>WhatsApp: </strong>
            <a href="https://wa.me/919486781846" target="_blank" rel="noopener noreferrer">
              Message on WhatsApp
            </a>
          </p>
          <p>
            <strong>Email: </strong>
            <a href="mailto:info@kerithtravel.com">info@kerithtravel.com</a>
          </p>
          <p>
            <strong>Address: </strong>
            Mano Complex 18 41 B20,<br />
            Kazhuvanthittai, Kuzhithurai
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupportModal;
