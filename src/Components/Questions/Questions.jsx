import React, { useState } from "react";
import "./Questions.css";
import Accordion from "./Accordion";
const Questions = () => {
  const [active, setActive] = useState(
    "How do i chose right travel destination for me?"
  );
  return (
    <div className="questions section container">
      <div className="secHeading">
        <h3>Frequently Asked Questions</h3>
      </div>
      <div className="secContainer grid">
        <div className="accordion grid">
          <Accordion
            title="How to find my destination"
            desc="Consider your interests, budget, desired experiences, and the type of
          environment, Research destinations that align with your preferences"
            active={active}
            setActive={setActive}
          />
          <Accordion
            title="How can i find budget friendly travel options and deals?"
            desc="Look for travel deals, discounts on flights and accomodations, and
            consider using travel apps or websites that offer competitive prices. Being
            flexible with your travel dates can also help you find better deals"
            active={active}
            setActive={setActive}
          />
          <Accordion
            title="Best times to visit specific destination?"
            desc="Look for travel deals, discounts on flights and accomodations, and
            consider using travel apps or websites that offer competitive prices. Being
            flexible with your travel dates can also help you find better deals"
            active={active}
            setActive={setActive}
          />
        </div>
        <div className="form">
          <div className="secHeading">
            <h4>Do you have any specific question?</h4>
            <p>
              Please fill the form below and our dedicated team will get in
              touch with you as soon as possible.
            </p>
          </div>
          <div className="formContent grid">
            <input type="email" placeholder="Enter Email Address" />
            <textarea placeholder="Enter your question here"></textarea>
            <button className="btn">Submit Inquiry</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
