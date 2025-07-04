import React from "react";

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
    onBookNow,
  }) => {
    // Helper to handle overlay close (avoid closing when clicking inside modal)
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    // Action area content (reused for both modes)
    const ActionArea = (
      <div className="action-area">
        <div className="quantity-selector" aria-label="Select number of travelers">
          <span>👥 Travelers:</span>
          <button
            type="button"
            onClick={decreaseQty}
            aria-label="Decrease number of travelers"
          >
            −
          </button>
          <span
            aria-live="polite"
            aria-atomic="true"
            style={{
              minWidth: "2ch",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={increaseQty}
            aria-label="Increase number of travelers"
          >
            +
          </button>
        </div>
        <p className="total" aria-live="polite" aria-atomic="true">
          <strong>Total:</strong> ₹
          {(
            (customMode
              ? customDetails.priceINR || 0
              : pack?.priceINR || 0) * quantity
          ).toLocaleString("en-IN")}
        </p>
        <div className="action-buttons-row" style={{ display: "flex", gap: "0.7rem" }}>
          <button
            className="book-button full-width"
            type="button"
            onClick={onBookNow}
            style={{ flex: 1 }}
          >
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
      <div
        className="modal-overlay"
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal" tabIndex={-1}>
          <button
            className="close"
            type="button"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>

          {customMode ? (
            <div className="modal-info">
              <h2 id="modal-title">Create Your Own Tour</h2>

              {["duration", "location", "category", "stay", "transport", "desc"].map(
                (field) => (
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
                )
              )}

              <input
                type="number"
                placeholder="Amount per person (₹)"
                value={customDetails.priceINR}
                min={0}
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
              {pack?.img && (
                <img src={pack.img} alt={pack.name} loading="lazy" />
              )}
              <div className="modal-info">
                <h2 id="modal-title">{pack.name}</h2>
                <p>
                  <strong>Duration:</strong> {pack.duration}
                </p>
                <p>
                  <strong>Location:</strong> {pack.location}
                </p>
                <p>
                  <strong>Category:</strong> {pack.category}
                </p>
                <p>
                  <strong>Stay:</strong> {pack.stay}
                </p>
                <p>
                  <strong>Transport:</strong> {pack.transport}
                </p>
                <p>
                  <strong>Description:</strong> {pack.desc}
                </p>
                <p>
                  <strong>Amount per person:</strong> ₹
                  {pack.priceINR?.toLocaleString("en-IN")}
                </p>
                <p>
                  <strong>Rating:</strong> ⭐ {pack.rating}
                </p>

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