import React, { useEffect, useState } from "react";
import "./Subscribe.css";
import calling from "../../assets/subscribe.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import TermsModal from './TermsConditions/TermsModal' // adjust the import path

const Subscribe = () => {
  const [showTerms, setShowTerms] = useState(false);

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
            We offer personalised itineraries tailored to individual preferences
            and interests.
          </p>
          <div className="buttons flex">
            <button data-aos="fade-up" className="btn">
              Start Here
            </button>
            <button data-aos="fade-up" className="btn" onClick={() => setShowTerms(true)}>
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
    </div>
  );
};

export default Subscribe;
