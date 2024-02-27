import React from "react";
import { useState } from "react";
import "./Navbar.css";
import { SiKaios } from "react-icons/si";
import { AiFillCloseCircle } from "react-icons/ai";
import { PiDotsNineBold } from "react-icons/pi";

const Navbar = () => {
  const [navBar, SetNavBar] = useState("menu");

  const showNavBar = () => {
    SetNavBar("menu showNavbar");
  };

  const removeNavBar = () => {
    SetNavBar("menu");
  };

  return (
    <div className="blurNav">
      <div className="navBar">
        <div className="logoDiv">
          <SiKaios className="icon" />
          <span>erith Travels</span>
        </div>

        <div className={navBar}>
          <ul>
            <li className="navList">Destination</li>
            <li className="navList">About Us</li>
            <li className="navList">Testimonial</li>
            <li className="navList">Gallery</li>
          </ul>
          <AiFillCloseCircle
            className="icon closeIcon"
            onClick={removeNavBar}
          />
        </div>
        <button className="signUpBtn btn">Sign Up</button>
        <PiDotsNineBold className="icon" onClick={showNavBar} />
      </div>
    </div>
  );
};

export default Navbar;
