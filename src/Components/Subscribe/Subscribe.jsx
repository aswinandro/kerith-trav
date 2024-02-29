import React, { useEffect } from "react";
import "./Subscribe.css";
import calling from "../../assets/subscribe.jpg";
import Aos from "aos";
import "aos/dist/aos.css";

const Subscribe = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="subscribe section container">
      <div className="secContainer grid">
        <img data-aos="fade-down" src={calling} alt="Div Image" />
        <div className="textDiv">
          <h4 data-aos="fade-up">Best way to start your journey</h4>
          <p>
            We offer personalised iteneries tailored to individual preferences
            and interests
          </p>
          <button data-aos="fade-up" className="btn">
            Start Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
