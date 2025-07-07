import React, { useEffect } from "react";
import "./Footer.css";
import { FaFacebookF } from "react-icons/fa";
import { SiKaios } from "react-icons/si";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { Link, Element } from "react-scroll";
import TermsModal from '../Subscribe/TermsConditions/TermsModal' 
import SupportModal from "./SupportModal/SupportModal";
import Aos from "aos";
import "aos/dist/aos.css";
import imgBg from "../../assets/bg.svg";

const Footer = () => {
  const [showTerms, setShowTerms] = React.useState(false);
  const [showSupport, setShowSupport] = React.useState(false);

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
          <span className="linkTitle ">Information</span>
          <li>
            <a href="#">Home</a>
          </li>
          {/* <li>
            <a href="#">Explore</a>
          </li>
          <li>
            <a href="#">Travel</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li> */}
        </div>

        <div className="footerLinks" data-aos="fade-up">
          <span className="linkTitle">Helpful Links</span>
          <li>
  <Link to="destinations" smooth={true} duration={400} className="footerLink">
    Destination
  </Link>
</li>

          <li>
  <a href="#" onClick={() => setShowSupport(true)}>Support & Contact</a>
</li>

          <li>
            <a href="" onClick={(e) => {
      e.preventDefault(); // ✅ prevents scroll to top
      setShowTerms(true);
    }}>Terms & Conditions</a>

          </li>
          <li>
            <a href="#" onClick={() => setShowTerms(true)}>Privacy</a>

          </li>
        </div>
        <div className="footerLinks">
          <span className="linkTitle">Contact Details</span>
          <a href="tel:+919486781846"><span className="phone">+91 9486781846</span></a>
          <a href="mailto:info@kerithtravel.com"><span className="email">info@kerithtravel.com</span></a>
          <li className="email">Mano Complex 18 41 B20</li>
          <li className="email">Kuzhithurai, Kannyakumari</li>
          <li className="email">TamilNadu, India</li>
        </div>
      </div>
      {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
      {showSupport && <SupportModal onClose={() => setShowSupport(false)} />}
    </div>
  );
};

export default Footer;
