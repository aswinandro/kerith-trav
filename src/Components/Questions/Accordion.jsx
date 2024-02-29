import React, { useEffect } from "react";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import Aos from "aos";
import "aos/dist/aos.css";

const Accordion = ({ title, desc, active, setActive }) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="accordionContainer" data-aos="fade-up">
      <span
        className={(active === title ? "activeTitle" : "") + " title" + " flex"}
      >
        {title}
        {/* How do i chose right travel destination for me? */}
        <span onClick={() => setActive(title)}>
          {active === title ? (
            <BsArrowDownCircle className="icon"></BsArrowDownCircle>
          ) : (
            <BsArrowUpCircle className="icon" />
          )}
        </span>
      </span>
      <p className={(active === title ? " show" : "") + " description"}>
        {desc}
        {/* Consider your interests, budget, desired experiences, and the type of
        environment, Research destinations that align with your preferences */}
      </p>
    </div>
  );
};

export default Accordion;
