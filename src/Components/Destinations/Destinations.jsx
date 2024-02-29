import React, { useEffect } from "react";
import "./Destinations.css";
import { MdLocationPin } from "react-icons/md";
import { BsFillCreditCardFill, BsFillCalendarDateFill } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { TiLocation } from "react-icons/ti";

import image1 from "../../assets/tripparis.jpg";
import image2 from "../../assets/tripreef.jpg";
import image3 from "../../assets/tripmacau.jpg";
import image4 from "../../assets/tripdubai.jpg";
import image5 from "../../assets/tripalmafi.jpg";
import image6 from "../../assets/tripbora.jpg";
import image7 from "../../assets/banftrip.jpg";
import image8 from "../../assets/croatiatrip.jpg";

import Aos from "aos";
import "aos/dist/aos.css";

//Array for Cards

const destinations = [
  {
    id: 1,
    img: image1,
    name: "Paris",
    location: " Île-de-France Region, France",
    rating: 4.7,
    desc: "The City of Light captivates visitors with its iconic landmarks like the Eiffel Tower, charming streets lined with cafes, world-class museums, and romantic ambiance, making it a timeless destination for lovers and culture enthusiasts alike.",
  },
  {
    id: 2,
    img: image2,
    name: "Great Barrier Reef, Australia",
    location: "Coral Sea, Queensland",
    rating: 4.3,
    desc: " Home to the world's largest coral reef system, the Great Barrier Reef is a marine paradise of vibrant coral gardens, colorful fish, and diverse marine life, offering unparalleled snorkeling and diving experiences in crystal-clear waters.",
  },
  {
    id: 3,
    img: image3,
    name: "Machu Picchu, Peru",
    location: "Andes Mountains",
    rating: 4.7,
    desc: "Nestled high in the Andes Mountains, Machu Picchu is an iconic Incan citadel surrounded by misty peaks and lush green valleys, drawing travelers seeking adventure and awe-inspiring archaeological wonders.",
  },
  {
    id: 4,
    img: image4,
    name: "Dubai, United Arab Emirates",
    location: "Arabian Peninsula, Persian Gulf",
    rating: 4.7,
    desc: " A modern marvel of architecture and luxury, Dubai dazzles with its futuristic skyscrapers, world-class shopping malls, pristine beaches, and extravagant attractions, offering visitors a glimpse into the opulent lifestyle of the Middle East.",
  },
  {
    id: 5,
    img: image5,
    name: "Amalfi Coast, Italy",
    location: "Southern Italy, Mediterranean Coast",
    rating: 4.7,
    desc: "With its dramatic cliffside villages, azure waters, and colorful terraced gardens, the Amalfi Coast is a UNESCO World Heritage site that epitomizes Mediterranean charm and elegance.",
  },
  {
    id: 6,
    img: image6,
    name: "Bora Bora, French Polynesia",
    location: "South Pacific Ocean",
    rating: 4.3,
    desc: " Known for its turquoise lagoon, overwater bungalows, and stunning coral reefs, Bora Bora is a tropical paradise offering unparalleled luxury and natural beauty.",
  },
  {
    id: 7,
    img: image7,
    name: "Banff National Park, Canada",
    location: "Alberta, Canadian Rockies",
    rating: 4.7,
    desc: "Home to soaring peaks, pristine glacial lakes, and abundant wildlife, Banff National Park is a breathtaking wilderness playground offering outdoor adventures year-round.",
  },
  {
    id: 8,
    img: image8,
    name: "Dubrovnik, Croatia",
    location: "Adriatic Sea, Southern Croatia",
    rating: 4.7,
    desc: " Dubrovnik's medieval walls, marble streets, and picturesque coastline make it a UNESCO World Heritage site and a must-visit destination for history buffs and beach lovers alike.",
  },
];

const Destinations = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="destination section container">
      <div className="secContainer">
        <div className="secTitle">
          <span className="redText" data-aos="fade-up-right">
            Explore Now
          </span>
          <h3 data-aos="fade">Find your Dream Destination</h3>
          <p data-aos="fade-up">
            Fill in the fields to find your best spot for next tour
          </p>
        </div>
        <div className="searchField grid">
          <div className="inputField flex" data-aos="fade-up">
            <MdLocationPin className="icon"></MdLocationPin>
            <input type="text" placeholder="Location" />
          </div>
          <div className="inputField flex" data-aos="fade-up">
            <BsFillCreditCardFill className="icon" />
            <input type="text" placeholder="Budget" />
          </div>
          <div className="inputField flex" data-aos="fade-up">
            <BsFillCalendarDateFill className="icon" />
            <input type="date" placeholder="Date" />
          </div>

          <button className="btn flex" data-aos="fade-up">
            <BiSearchAlt className="icon" />
            Search
          </button>
        </div>
        <div className="secMenu" data-aos="fade-up">
          <ul className="flex">
            <li className="active">All</li>
            <li>Recomendded</li>
            <li>Beach</li>
            <li>Park</li>
            <li>Nature</li>
            <li>Mountain</li>
          </ul>
        </div>
        <div className="destinationContainer grid">
          {destinations.map((destination) => {
            return (
              <div
                className="singleDestination"
                key={"destination.id"}
                data-aos="fade-up"
              >
                <div className="imgDiv" data-aos="fade-up">
                  <img src={destination.img} alt="Destination Image" />
                  <div className="descInfo flex">
                    <div className="text">
                      <span className="name">{destination.name}</span>
                      {/* <p>
                        Bora Bora (French: Bora-Bora; Tahitian: Pora Pora) is an
                        island group in the Leeward Islands in the South
                        Pacific. The Leeward Islands comprise the western part
                        of the Society Islands of French Polynesia, which is an
                        overseas collectivity of the French Republic
                      </p> */}
                      <p className="flex">
                        <TiLocation className="icon" />
                        {destination.location}
                      </p>
                    </div>
                    <span className="rating">{destination.rating}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {/* <div className="singleDestination">
            <div className="imgDiv">
              <img src={image1} alt="Destination Image" />
              <div className="descInfo flex">
                <div className="text">
                  <span className="name">Baro Baro Island</span>
                  <p>
                    Bora Bora (French: Bora-Bora; Tahitian: Pora Pora) is an
                    island group in the Leeward Islands in the South Pacific.
                    The Leeward Islands comprise the western part of the Society
                    Islands of French Polynesia, which is an overseas
                    collectivity of the French Republic
                  </p>
                  <p className="flex">
                    <TiLocation className="icon" />
                    Netherlands
                  </p>
                </div>
                <span className="rating">4.6</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
