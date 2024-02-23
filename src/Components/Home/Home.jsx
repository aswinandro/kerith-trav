import React from "react";
import "./Home.css";
import VideoBg from "../../assets/bg1.mp4";
import { AiOutlineSwapRight } from "react-icons/ai";

const Home = () => {
  return (
    <div className="Home">
      <div className="videoBg">
        <video src={VideoBg} autoPlay loop muted></video>
      </div>
      <div className="sectionText">
        <h1>Unlock your Travel Dreams With Us!</h1>
        <p>Discover the world's most adventurous nature life is so short!</p>
        <button className="btn flex">
          Get Started <AiOutlineSwapRight className="icon" />
        </button>
      </div>
      <div className="popularPlaces">
        <div className="content">
          <h3>Popular Places</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
