import React, { useEffect, useState } from "react";
import "./Destinations.css";
import { MdLocationPin } from "react-icons/md";
import { BsFillCreditCardFill, BsFillCalendarDateFill, BsStarFill } from "react-icons/bs";
import { BiSearchAlt, BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { TiLocation } from "react-icons/ti";
import Aos from "aos";
import "aos/dist/aos.css";

// Images
import image1 from "../../assets/tripparis.jpg";
import image2 from "../../assets/tripreef.jpg";
import image3 from "../../assets/tripmacau.jpg";
import image4 from "../../assets/tripdubai.jpg";
import image5 from "../../assets/tripalmafi.jpg";
import image6 from "../../assets/tripbora.jpg";
import image7 from "../../assets/banftrip.jpg";
import image8 from "../../assets/croatiatrip.jpg";
import fallbackImg from "../../assets/tripbora.jpg"; // Reuse any safe image

const defaultDestinations = [
  {
    id: 1,
    img: image1,
    name: "Paris",
    location: "Île-de-France Region, France",
    rating: 4.7,
    desc: "The City of Light captivates visitors with its iconic landmarks like the Eiffel Tower, charming streets, museums, and romantic ambiance.",
  },
  {
    id: 2,
    img: image2,
    name: "Great Barrier Reef, Australia",
    location: "Coral Sea, Queensland",
    rating: 4.3,
    desc: "Home to the world's largest coral reef system, vibrant coral gardens, and marine life, ideal for snorkeling and diving.",
  },
  {
    id: 3,
    img: image3,
    name: "Machu Picchu, Peru",
    location: "Andes Mountains",
    rating: 4.7,
    desc: "Iconic Incan citadel nestled in misty Andes, attracting adventurers and history lovers alike.",
  },
  {
    id: 4,
    img: image4,
    name: "Dubai, United Arab Emirates",
    location: "Arabian Peninsula, Persian Gulf",
    rating: 4.7,
    desc: "Futuristic skyscrapers, luxury malls, and cultural fusion make Dubai a top destination.",
  },
  {
    id: 5,
    img: image5,
    name: "Amalfi Coast, Italy",
    location: "Southern Italy, Mediterranean Coast",
    rating: 4.7,
    desc: "Dramatic cliffside villages and Mediterranean charm define this UNESCO World Heritage site.",
  },
  {
    id: 6,
    img: image6,
    name: "Bora Bora, French Polynesia",
    location: "South Pacific Ocean",
    rating: 4.3,
    desc: "Turquoise lagoons, overwater bungalows, and coral reefs — the ultimate tropical luxury.",
  },
  {
    id: 7,
    img: image7,
    name: "Banff National Park, Canada",
    location: "Alberta, Canadian Rockies",
    rating: 4.7,
    desc: "Glacial lakes, snow-capped peaks, and wilderness adventures await in Banff.",
  },
  {
    id: 8,
    img: image8,
    name: "Dubrovnik, Croatia",
    location: "Adriatic Sea, Southern Croatia",
    rating: 4.7,
    desc: "Medieval walls, scenic coastline, and rich culture draw travelers year-round.",
  },
];

const Destinations = () => {
  const [locationInput, setLocationInput] = useState("");
  const [destinations, setDestinations] = useState(defaultDestinations);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(defaultDestinations.length / 4));
  const [searchMode, setSearchMode] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const fetchCityDetails = async (cityName) => {
    try {
      setIsSearching(true);
      setError("");

      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        cityName
      )}&srlimit=10&format=json&origin=*`;
      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json();

      if (!searchData.query?.search?.length) {
        setError("No results found.");
        setDestinations([]);
        return;
      }

      const pageIds = searchData.query.search.map((item) => item.pageid);
      const detailsUrl = `https://en.wikipedia.org/w/api.php?action=query&pageids=${pageIds.join(
        "|"
      )}&prop=extracts|pageimages|coordinates&exintro=true&explaintext=true&piprop=thumbnail&pithumbsize=400&format=json&origin=*`;
      const detailsRes = await fetch(detailsUrl);
      const detailsData = await detailsRes.json();

      const results = pageIds.map((id) => {
        const page = detailsData.query.pages[id];
        return {
          id: page.pageid,
          img: page.thumbnail?.source || fallbackImg,
          name: page.title,
          location: page.coordinates
            ? `${page.coordinates[0].lat.toFixed(4)}, ${page.coordinates[0].lon.toFixed(4)}`
            : "Location unknown",
          desc: page.extract?.slice(0, 200) + "..." || "No description available",
          rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        };
      });

      setDestinations(results);
      setSearchMode(true);
      setTotalPages(Math.ceil(results.length / 4));
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    if (!locationInput.trim()) {
      setError("Please enter a location.");
      return;
    }
    fetchCityDetails(locationInput);
  };

  const resetToDefault = () => {
    setDestinations(defaultDestinations);
    setSearchMode(false);
    setLocationInput("");
    setError("");
    setTotalPages(Math.ceil(defaultDestinations.length / 4));
    setCurrentPage(1);
  };

  const startIdx = (currentPage - 1) * 4;
  const visibleDestinations = destinations.slice(startIdx, startIdx + 4);

  return (
    <div className="destination section container">
      <div className="secContainer">
        <div className="secTitle">
          <span className="redText" data-aos="fade-up-right">Explore Now</span>
          <h3 data-aos="fade">Find your Dream Destination</h3>
          <p data-aos="fade-up">Fill in the fields to find your best spot for next tour</p>
        </div>

        {/* 🔍 Search Bar */}
       <div className="searchField grid">
  {/* Location Input */}
  <div className="inputField flex" data-aos="fade-up">
    <MdLocationPin className="icon" />
    <input
      type="text"
      placeholder="Location"
      value={locationInput}
      onChange={(e) => setLocationInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    />
  </div>

  {/* Budget Input */}
  <div className="inputField flex" data-aos="fade-up">
    <BsFillCreditCardFill className="icon" />
    <input type="text" placeholder="Budget" />
  </div>

  {/* Date Input */}
  <div className="inputField flex" data-aos="fade-up">
    <BsFillCalendarDateFill className="icon" />
    <input type="date" />
  </div>

  {/* Search Button */}
  <button className="btn flex" onClick={handleSearch} data-aos="fade-up" disabled={isSearching}>
    {isSearching ? "Searching..." : (
      <>
        <BiSearchAlt className="icon" /> Search
      </>
    )}
  </button>

  {/* Show Default Button */}
  
</div>
        {/* 🔖 Categories (Static for now) */}
        <div className="secMenu" data-aos="fade-up">
          <ul className="flex">
            <li className="active">All</li>
             {searchMode && (
            <li onClick={resetToDefault}>Popular</li>
            )}
            <li>Nature</li>
            <li>Mountain</li>
            {destinations.length > 4 && (
              <>
                <li onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</li>
                <li onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</li>
              </>
            )}
          </ul>
        </div>

        {error && <p className="errorText" data-aos="fade">{error}</p>}

        {/* 🌍 Grid Results */}
        <div className="destinationContainer grid">
          {visibleDestinations.map((destination) => (
            <div className="singleDestination" key={destination.id} data-aos="fade-up">
              <div className="imgDiv">
                <img
                  src={destination.img}
                  alt={destination.name}
                  onError={(e) => (e.target.src = fallbackImg)}
                />
                <div className="descInfo flex">
                  <div className="text">
                    {/* <span className="name">{destination.name}</span> */}
                     <p>
                    {destination.desc}
                  </p>
                    <p className="flex">
                      <TiLocation className="icon" />
                      {destination.name}
                    </p>
                  </div>
                  <span className="rating">
                    <BsStarFill className="icon" /> {destination.rating}
                  </span>
                </div>
              </div>
              <div className="bodyContent">
                <p className="descParagraph">{destination.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ⏩ Pagination */}
        
      </div>
    </div>
  );
};

export default Destinations;
