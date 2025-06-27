import React, { useEffect } from "react";
import "./Home.css";
import VideoBg from "../../assets/bg1.mp4";
import image1 from "../../assets/popular1.jpg";
import image2 from "../../assets/popular2.jpg";
import image3 from "../../assets/popular3.jpg";
import image4 from "../../assets/popular4.jpg";
import { AiOutlineSwapRight } from "react-icons/ai";
import Aos from "aos";
import "aos/dist/aos.css";

// Memoize images outside component to avoid recreation on re-render
const popularImages = [image1, image2, image3, image4];

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []); // only once on mount

  return (
    <div className="Home">
      <div className="videoBg">
        <video
          src={VideoBg}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>

      <div className="sectionText">
        <h1 data-aos="fade-up">Unlock your Travel Dreams With Us!</h1>
        <p data-aos="fade-up">
          Discover the world's most adventurous nature — life is short!
        </p>
        <button data-aos="fade-up" className="btn flex">
          Get Started <AiOutlineSwapRight className="icon" />
        </button>
      </div>

      <div className="popularPlaces">
        <div className="content">
          <h3 data-aos="fade-up">Popular Places</h3>
          <div className="images flex">
            {popularImages.map((img, i) => (
              <img key={i} src={img} alt={`popular-${i + 1}`} loading="lazy" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Home); // prevents re-render unless props change
