import React from "react";
import { useNavigate } from "react-router-dom";

const PackageModal = React.memo(
  ({
    pack,
    customMode,
    customDetails,
    setCustomDetails,
    quantity,
    onClose,
    increaseQty,
    decreaseQty,
  }) => {
    const navigate = useNavigate();

    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const handleBookNow = () => {
      const finalPackage = customMode
        ? {
            name: "Custom Package",
            duration: customDetails.duration || "",
            location: customDetails.location || "",
            category: customDetails.category || "",
            stay: customDetails.stay || "",
            transport: customDetails.transport || "",
            desc: customDetails.desc || "",
            priceINR: customDetails.priceINR || 0,
            custom: true,
            img: "",
          }
        : {
            name: pack?.name || "",
            duration: pack?.duration || "",
            location: pack?.location || "",
            category: pack?.category || "",
            stay: pack?.stay || "",
            transport: pack?.transport || "",
            desc: pack?.desc || "",
            priceINR: pack?.priceINR || 0,
            rating: pack?.rating || 0,
            custom: false,
            img: pack?.img || "",
          };

      navigate("/payment", {
        state: {
          package: finalPackage,
          quantity,
        },
      });
    };

    const ActionArea = (
      <div className="action-area">
        <div className="quantity-selector" aria-label="Select number of travelers">
          <span>👥 Travelers:</span>
          <button type="button" onClick={decreaseQty} aria-label="Decrease number of travelers">−</button>
          <span aria-live="polite" style={{ minWidth: "2ch", display: "inline-block", textAlign: "center" }}>
            {quantity}
          </span>
          <button type="button" onClick={increaseQty} aria-label="Increase number of travelers">+</button>
        </div>
        <p className="total">
          <strong>Total:</strong> ₹
          {(
            (customMode ? customDetails.priceINR || 0 : pack?.priceINR || 0) * quantity
          ).toLocaleString("en-IN")}
        </p>
        <div className="action-buttons-row" style={{ display: "flex", gap: "0.7rem" }}>
          <button className="book-button full-width" type="button" onClick={handleBookNow} style={{ flex: 1 }}>
            Book Now
          </button>
          <button
            className="close-button-row"
            type="button"
            onClick={onClose}
            style={{
              flex: "0 0 auto",
              background: "#eee",
              color: "#222",
              border: "none",
              borderRadius: "1rem",
              fontWeight: 600,
              fontSize: "1rem",
              padding: "0.6rem 1.1rem",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Close
          </button>
        </div>
      </div>
    );

    return (
      <div className="modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true">
        <div className="modal" tabIndex={-1}>
          <button className="close" type="button" onClick={onClose} aria-label="Close modal">
            ×
          </button>

          {customMode ? (
            <div className="modal-info">
              <h2 id="modal-title">Create Your Own Tour</h2>

              {["duration", "location", "category", "stay", "transport", "desc"].map((field) => (
                <input
                  key={field}
                  placeholder={
                    field === "desc"
                      ? "Description"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  value={customDetails[field]}
                  onChange={(e) =>
                    setCustomDetails({
                      ...customDetails,
                      [field]: e.target.value,
                    })
                  }
                  autoFocus={field === "duration"}
                />
              ))}

              <input
                type="number"
                placeholder="Amount per person (₹)"
                value={customDetails.priceINR}
                onChange={(e) =>
                  setCustomDetails({
                    ...customDetails,
                    priceINR: Number(e.target.value),
                  })
                }
              />

              {ActionArea}
            </div>
          ) : (
            <>
              {pack?.img && <img src={pack.img} alt={pack.name} loading="lazy" />}
              <div className="modal-info">
                <h2 id="modal-title">{pack.name}</h2>
                <p><strong>Duration:</strong> {pack.duration}</p>
                <p><strong>Location:</strong> {pack.location}</p>
                <p><strong>Category:</strong> {pack.category}</p>
                <p><strong>Stay:</strong> {pack.stay}</p>
                <p><strong>Transport:</strong> {pack.transport}</p>
                <p><strong>Description:</strong> {pack.desc}</p>
                <p><strong>Amount per person:</strong> ₹{pack.priceINR?.toLocaleString("en-IN")}</p>
                <p><strong>Rating:</strong> ⭐ {pack.rating}</p>

                {ActionArea}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

export default PackageModal;
