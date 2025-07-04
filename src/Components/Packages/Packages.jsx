import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import packagesData from "./packagesData";
import PackageModal from "./PackageModal";
import "./Packages.css";

const Packages = () => {
  const [activePack, setActivePack] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customDetails, setCustomDetails] = useState({
    name: "Custom Tour",
    priceINR: 0,
    duration: "",
    location: "",
    category: "",
    stay: "",
    transport: "",
    desc: "",
  });

  const navigate = useNavigate();

  const increaseQty = useCallback(() => setQuantity((prev) => prev + 1), []);
  const decreaseQty = useCallback(
    () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1)),
    []
  );

  const closeModal = useCallback(() => {
    setActivePack(null);
    setIsCustomMode(false);
    setQuantity(1);
    setCustomDetails({
      name: "Custom Tour",
      priceINR: 0,
      duration: "",
      location: "",
      category: "",
      stay: "",
      transport: "",
      desc: "",
    });
  }, []);

  const handleBookNow = () => {
    const selected = isCustomMode
      ? { ...customDetails, id: "custom" }
      : activePack;

    navigate("/payment", { state: { package: selected, quantity } });
  };

  const cards = useMemo(
    () => [
      <div
        key="custom"
        className="card custom-card"
        onClick={() => {
          setIsCustomMode(true);
          setActivePack(null);
        }}
      >
        <div className="custom-content">
          <h3>➕ Create Your Own Tour</h3>
          <p>Customize location, duration, transport, and more</p>
        </div>
      </div>,

      ...packagesData.map((p) => (
        <div
          key={p.id}
          className="card"
          onClick={() => {
            setIsCustomMode(false);
            setActivePack(p);
          }}
        >
          <img src={p.img} alt={p.name} loading="lazy" />
          <div className="info">
            <h3>{p.name}</h3>
            <p>
              {p.duration} • ₹{p.priceINR.toLocaleString("en-IN")} per person
            </p>
            <div className="rating">⭐ {p.rating}</div>
          </div>
        </div>
      )),
    ],
    []
  );

  return (
    <div className="packages-section container">
      <h2 className="title">🌍 Our Featured Tours</h2>
      <div className="carousel">{cards}</div>

      {(activePack || isCustomMode) && (
        <PackageModal
          pack={activePack}
          customMode={isCustomMode}
          customDetails={customDetails}
          setCustomDetails={setCustomDetails}
          quantity={quantity}
          onClose={closeModal}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          onBookNow={handleBookNow}
        />
      )}
    </div>
  );
};

export default Packages;