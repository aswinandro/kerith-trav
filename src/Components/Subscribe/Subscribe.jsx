import React, { useEffect, useState, lazy, Suspense, memo, useCallback } from "react";
import "./Subscribe.css";
import calling from "../../assets/subscribe.jpg";
import Aos from "aos";
import "aos/dist/aos.css";

// Lazy load TermsModal for better performance
const TermsModal = lazy(() => import("./TermsConditions/TermsModal"));

const Subscribe = () => {
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    Aos.init({
      duration: 1000, // faster load animation
      once: true,     // only animate once
      mirror: false,
      offset: 100,
      easing: "ease-in-out",
    });
  }, []);

  // Memoized handler for modal open/close
  const handleOpenTerms = useCallback(() => setShowTerms(true), []);
  const handleCloseTerms = useCallback(() => setShowTerms(false), []);

  return (
    <section className="subscribe section container" role="region" aria-label="Subscribe Section">
      <div className="secContainer grid">
        <img
          data-aos="fade-down"
          src={calling}
          alt="Start your journey with us"
          loading="lazy"
          width="500"
          height="auto"
          className="subscribeImage"
        />

        <div className="textDiv">
          <h4 data-aos="fade-up">Best way to start your journey</h4>
          <p data-aos="fade-up" data-aos-delay="100">
            We offer personalised itineraries tailored to individual preferences and interests.
          </p>
          <div className="buttons flex">
            <button data-aos="fade-up" data-aos-delay="200" className="btn" type="button">
              Start Here
            </button>
            <button
              data-aos="fade-up"
              data-aos-delay="300"
              className="btn"
              type="button"
              onClick={handleOpenTerms}
              aria-haspopup="dialog"
              aria-controls="terms-modal"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {showTerms && (
        <Suspense fallback={<div className="modal-loading">Loading terms...</div>}>
          <TermsModal onClose={handleCloseTerms} />
        </Suspense>
      )}
    </section>
  );
};

// Export as memoized component for performance
export default memo(Subscribe);
