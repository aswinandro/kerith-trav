import React from "react";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";

const Accordion = ({ title, desc, active, setActive }) => {
  return (
    <div className="accordionContainer">
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
