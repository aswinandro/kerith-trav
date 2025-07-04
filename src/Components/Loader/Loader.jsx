// Components/Loading.jsx
import React from "react";
import "./Loader.css";
import loadImg from "../../assets/loader.gif";
const Loader = () => {
  return (
    <div className="loading-container">
      <div className="loader">
        <img src={loadImg} alt="Loading" />
      </div>
      <p>Warming up the jet engines...</p>
    </div>
  );
};

export default Loader;
