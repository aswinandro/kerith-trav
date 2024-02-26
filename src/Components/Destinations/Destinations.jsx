import React from "react";
import "./Destinations.css";
import { MdLocationPin } from "react-icons/md";
import { BsFillCreditCardFill, BsFillCalendarDateFill } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { TiLocation } from "react-icons/ti";

import image1 from "../../assets/trip1.jpeg";
// import image1 from "../../assets/trip1.jpeg";
// import image1 from "../../assets/trip1.jpeg";
// import image1 from "../../assets/trip1.jpeg";
// import image1 from "../../assets/trip1.jpeg";
// import image1 from "../../assets/trip1.jpeg";
// import image1 from "../../assets/trip1.jpeg";
// import image1 from "../../assets/trip1.jpeg";

//Array for Cards

const destinations = [
  {
    id: 1,
    img: image1,
    name: "Seychelles Island",
    location: "Indian Ocean",
    rating: 4.7,
  },
  {
    id: 2,
    img: image1,
    name: "Bora Bora Island",
    location: "Polynesia",
    rating: 4.3,
  },
  {
    id: 3,
    img: image1,
    name: "Seychelles Island",
    location: "Indian Ocean",
    rating: 4.7,
  },
  {
    id: 4,
    img: image1,
    name: "Maldives Island",
    location: "Indian Ocean",
    rating: 4.7,
  },
  {
    id: 5,
    img: image1,
    name: "Seychelles Island",
    location: "Indian Ocean",
    rating: 4.7,
  },
  {
    id: 6,
    img: image1,
    name: "Bora Bora Island",
    location: "Polynesia",
    rating: 4.3,
  },
  {
    id: 7,
    img: image1,
    name: "Seychelles Island",
    location: "Indian Ocean",
    rating: 4.7,
  },
  {
    id: 8,
    img: image1,
    name: "Maldives Island",
    location: "Indian Ocean",
    rating: 4.7,
  },
];

const Destinations = () => {
  return (
    <div className="destination section container">
      <div className="secContainer">
        <div className="secTitle">
          <span className="redText">Explore Now</span>
          <h3>Find your Dream Destination</h3>
          <p>Fill in the fields to find your best spot for next tour</p>
        </div>
        <div className="searchField grid">
          <div className="inputField flex">
            <MdLocationPin className="icon"></MdLocationPin>
            <input type="text" placeholder="Location" />
          </div>
          <div className="inputField flex">
            <BsFillCreditCardFill className="icon" />
            <input type="text" placeholder="Budget" />
          </div>
          <div className="inputField flex">
            <BsFillCalendarDateFill className="icon" />
            <input type="text" placeholder="Date" />
          </div>

          <button className="btn flex">
            <BiSearchAlt className="icon" />
            Search
          </button>
        </div>
        <div className="secMenu">
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
              <div className="singleDestination" key={"destination.id"}>
                <div className="imgDiv">
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
