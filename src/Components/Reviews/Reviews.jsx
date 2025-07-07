import React, { useEffect, memo } from "react";
import "./Reviews.css";
import { AiFillStar } from "react-icons/ai";
import Aos from "aos";
import "aos/dist/aos.css";

// Optimized image imports
import rev1 from "../../assets/rev (1).jpg";
import rev2 from "../../assets/rev (2).jpg";
import rev3 from "../../assets/rev (3).jpg";
import rev4 from "../../assets/rev (4).jpg";
import cust from "../../assets/happycustomer.jpg";

const Review = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000, // faster animation
      once: true,     // animate once only
      easing: "ease-in-out",
    });
  }, []);

  const reviews = [rev1, rev2, rev3, rev4];

  return (
    <section className="review section container" role="region" aria-label="Customer Reviews">
      <div className="secContainer grid">
        <div className="imgDiv" data-aos="fade-down">
          <img
            src={cust}
            alt="Happy customer testimonial"
            loading="lazy"
            width="500"
            height="auto"
            className="reviewMainImage"
          />
        </div>

        <div className="textDiv">
          <span className="redText" data-aos="fade-up">From Our Clients</span>
          <h3 data-aos="fade-up">Real Travel History from Our Beloved Clients</h3>
          <p data-aos="fade-up">
            By choosing us as their tour agency, customers enjoy an enriching
            experience filled with unforgettable memories.
          </p>

          <div className="stars flex" data-aos="fade-up">
            {[...Array(5)].map((_, i) => (
              <AiFillStar key={i} className="icon" aria-hidden="true" />
            ))}
          </div>

          <div className="clientsImages flex">
            {reviews.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Client testimonial ${index + 1}`}
                loading="lazy"
                width="80"
                height="80"
                className="clientImage"
                data-aos="fade-up"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Review);
