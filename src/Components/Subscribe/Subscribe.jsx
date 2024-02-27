import React from "react";
import "./Subscribe.css";
import calling from "../../assets/subscribe.jpg";

const Subscribe = () => {
  return (
    <div className="subscribe section container">
      <div className="secContainer grid">
        <img src={calling} alt="Div Image" />
        <div className="textDiv">
          <h4>Best way to start your journey</h4>
          <p>
            We offer personalised iteneries tailored to individual preferences
            and interests
          </p>
          <button className="btn">Start Here</button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
