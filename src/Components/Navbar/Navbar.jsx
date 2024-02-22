import React from "react";
import "./Navbar.css";
import { SiKaios } from "react-icons/si";
import { AiFillCloseCircle } from "react-icons/ai";
import { PiDotsNineBold } from "react-icons/pi";

const Navbar = () => {
  return (
    <div className="navBar">
      <div className="logoDiv">
        <SiKaios className="icon" />
        <span>Kerith Travels</span>
      </div>

      <div className="menu">
        <ul>
          <li className="navList">Destination</li>
          <li className="navList">About Us</li>
          <li className="navList">Testimonial</li>
          <li className="navList">Gallery</li>
        </ul>
        <AiFillCloseCircle className="icon" />
      </div>
      <button className="signUpBtn btn">Sign Up</button>
      <PiDotsNineBold className="icon" />
    </div>
  );
};

export default Navbar;
