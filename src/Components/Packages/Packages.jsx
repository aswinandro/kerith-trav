import React, { useState, useCallback, useMemo } from "react";
import packagesData from "./packagesData";
import "./Packages.css";

const Packages = () => {
  const [activePack, setActivePack] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Reusable event handlers with stable references
  const increaseQty = useCallback(() => setQuantity((prev) => prev + 1), []);
  const decreaseQty = useCallback(() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1)), []);
  const closeModal = useCallback(() => {
    setActivePack(null);
    setQuantity(1);
  }, []);

  // Memoize package cards to avoid re-renders
  const cards = useMemo(() => (
    packagesData.map((p) => (
      <div key={p.id} className="card" onClick={() => setActivePack(p)}>
        <img src={p.img} alt={p.name} loading="lazy" />
        <div className="info">
          <h3>{p.name}</h3>
          <p>{p.duration} • ₹{p.priceINR.toLocaleString("en-IN")}</p>
          <div className="rating">⭐ {p.rating}</div>
        </div>
      </div>
    ))
  ), []);

  return (
    <div className="packages-section container">
      <h2 className="title">🌍 Our Featured Tours</h2>
      <div className="carousel">{cards}</div>

      {activePack && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={closeModal}>×</button>
            <img src={activePack.img} alt={activePack.name} loading="lazy" />
            <div className="modal-info">
              <h2>{activePack.name}</h2>
              <p><strong>Duration:</strong> {activePack.duration}</p>
              <p><strong>Location:</strong> {activePack.location}</p>
              <p><strong>Category:</strong> {activePack.category}</p>
              <p><strong>Stay:</strong> {activePack.stay}</p>
              <p><strong>Transport:</strong> {activePack.transport}</p>
              <p><strong>Description:</strong> {activePack.desc}</p>
              <p><strong>Rating:</strong> ⭐ {activePack.rating}</p>

              <div className="quantity-selector">
                <span>👥 Travelers: </span>
                <button onClick={decreaseQty}>−</button>
                <span>{quantity}</span>
                <button onClick={increaseQty}>+</button>
              </div>

              <p className="total">
                <strong>Total Price:</strong> ₹{(activePack.priceINR * quantity).toLocaleString("en-IN")}
              </p>

              <button className="book-button">Book Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;
