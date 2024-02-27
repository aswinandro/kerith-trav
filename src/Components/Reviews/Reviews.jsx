import React from "react";
import "./Reviews.css";
import { AiFillStar } from "react-icons/ai";
import rev1 from "../../assets/rev (1).jpg";
import rev2 from "../../assets/rev (2).jpg";
import rev3 from "../../assets/rev (3).jpg";
import rev4 from "../../assets/rev (4).jpg";

const Review = () => {
  return (
    <div className="review section container">
      <div className="secContainer grid">
        <div className="textDiv">
          <span className="redText">From Our Clients</span>
          <h3>Real Travel History from Our Beloved Clients</h3>
          <p>
            By Choosing us as their tour agency, customers can expect an
            enriching and enjoyable travel experience, filled with unforgettable
            memories that will last a lifetime.
          </p>
          <span className="stars flex">
            <AiFillStar className="icon" />
            <AiFillStar className="icon" />
            <AiFillStar className="icon" />
            <AiFillStar className="icon" />
            <AiFillStar className="icon" />
          </span>

          <div className="clientsImages flex">
            <img src={rev1} alt="Client Image" />
            <img src={rev2} alt="Client Image" />
            <img src={rev3} alt="Client Image" />
            <img src={rev4} alt="Client Image" />
          </div>
        </div>
        <div className="imgDiv">
          <img src={rev1} alt="div image" />
        </div>
      </div>
    </div>
  );
};

export default Review;
