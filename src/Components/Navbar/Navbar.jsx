import React, { useState } from "react";
import "./Navbar.css";
import { SiKaios } from "react-icons/si";
import { AiFillCloseCircle } from "react-icons/ai";
import { PiDotsNineBold } from "react-icons/pi";
import { Link, Element } from "react-scroll";
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
            <li className="navList">
              <Link to="destinations" smooth={true} duration={400}>
                Destination
              </Link>
            </li>
            <li className="navList">
              <Link to="about" smooth={true} duration={400}>
                About Us
              </Link>
            </li>
            <li className="navList">
              <Link to="reviews" smooth={true} duration={400}>
                Testimonial
              </Link>
            </li>
            <li className="navList">
              <Link to="destinations" smooth={true} duration={400}>
                Gallery
              </Link>
            </li>
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
