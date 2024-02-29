import React, { useState, useEffect } from "react";
import "./Questions.css";
import Accordion from "./Accordion";
import Aos from "aos";
import "aos/dist/aos.css";
const Questions = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [active, setActive] = useState(
    "How do i chose right travel destination for me?"
  );
  return (
    <div className="questions section container">
      <div className="secHeading">
        <h3 data-aos="fade-up">Frequently Asked Questions</h3>
      </div>
      <div className="secContainer grid" data-aos="fade-up">
        <div className="accordion grid">
          <Accordion
            title="How to find my destination"
            desc="Consider your interests, budget, desired experiences, and the type of
          environment, Research destinations that align with your preferences"
            active={active}
            setActive={setActive}
            data-aos="fade-up"
          />
          <Accordion
            title="How can i find budget friendly travel options and deals?"
            desc="Look for travel deals, discounts on flights and accomodations, and
            consider using travel apps or websites that offer competitive prices. Being
            flexible with your travel dates can also help you find better deals"
            active={active}
            setActive={setActive}
            data-aos="fade-up"
          />
          <Accordion
            title="Best times to visit specific destination?"
            desc="Look for travel deals, discounts on flights and accomodations, and
            consider using travel apps or websites that offer competitive prices. Being
            flexible with your travel dates can also help you find better deals"
            active={active}
            setActive={setActive}
            data-aos="fade-up"
          />
          <Accordion
            title="Can I make changes to or cancel my booking?"
            desc="The ability to make changes or cancel your booking depends on the terms and conditions of the service provider you booked with. 
            Some bookings may be non-refundable or subject to fees for changes. We recommend reviewing the specific policies outlined at the time of 
            booking or contacting our customer support for assistance."
            active={active}
            setActive={setActive}
            data-aos="fade-up"
          />
        </div>
        <div className="form">
          <div className="secHeading">
            <h4 data-aos="fade-up">Do you have any specific question?</h4>
            <p>
              Please fill the form below and our dedicated team will get in
              touch with you as soon as possible.
            </p>
          </div>
          <div className="formContent grid">
            <input
              data-aos="fade-up"
              type="email"
              placeholder="Enter Email Address"
            />
            <textarea
              data-aos="fade-up"
              placeholder="Enter your question here"
            ></textarea>
            <button className="btn">Submit Inquiry</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
