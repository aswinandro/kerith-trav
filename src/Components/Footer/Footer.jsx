import React, { useEffect } from "react";
import "./Footer.css";
import { FaFacebookF } from "react-icons/fa";
import { SiKaios } from "react-icons/si";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import Aos from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="footer">
      <div className="secContainer container grid">
        <div className="logoDiv">
          <div className="footerLogo" data-aos="fade-up">
            <SiKaios className="icon" />
            <span>erith Travels</span>
          </div>
          <div className="socials flex">
            <FaFacebookF className="icon" />
            <BsTwitter className="icon" />
            <AiFillInstagram className="icon" />
          </div>
        </div>

        <div className="footerLinks" data-aos="fade-up">
          <span className="linkTitle">Information</span>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Explore</a>
          </li>
          <li>
            <a href="#">Travel</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
        </div>

        <div className="footerLinks" data-aos="fade-up">
          <span className="linkTitle">Helpful Links</span>
          <li>
            <a href="#">Destination</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">Travel & Conditions</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
        </div>
        <div className="footerLinks">
          <span className="linkTitle">Contact Details</span>
          <span className="phone">+91 9486781846</span>
          <span className="email">info@kerithtravel.com</span>
          <span className="email">Mano Complex 18 41 B20</span>
          <span className="email">Kazhuvanthittai, Kuzhithurai</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
