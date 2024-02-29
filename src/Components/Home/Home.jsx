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

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="Home">
      <div className="videoBg">
        <video src={VideoBg} autoPlay loop muted></video>
      </div>
      <div className="sectionText">
        <h1 data-aos="fade-up">Unlock your Travel Dreams With Us!</h1>
        <p data-aos="fade-up">
          Discover the world's most adventurous nature life is so short!
        </p>
        <button data-aos="fade-up" className="btn flex">
          Get Started <AiOutlineSwapRight className="icon" />
        </button>
      </div>
      <div className="popularPlaces">
        <div className="content">
          <h3 data-aos="fade-up">Popular Places</h3>
          <div className="images flex" data-aos="fade-up">
            <img src={image1} alt="" />
            <img src={image2} alt="" />
            <img src={image3} alt="" />
            <img src={image4} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
