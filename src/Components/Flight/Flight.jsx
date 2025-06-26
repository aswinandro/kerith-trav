import React, { useEffect, useState} from "react";
import "./Flight.css";
import calling from "../../assets/subscribe.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";


const Flight = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.example.com/flights', {
        params: {
          origin,
          destination,
        },
      });
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flight-search">
      <h1>Flight Search</h1>
      <div className="form-group">
        <label>Origin:</label>
        <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Destination:</label>
        <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
      </div>
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search Flights'}
      </button>
      <div className="results">
        {flights.length > 0 ? (
          <ul>
            {flights.map((flight, index) => (
              <li key={index}>
                {flight.airline} - {flight.flightNumber} - {flight.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>No flights found.</p>
        )}
      </div>
    </div>
  );
};

export default Flight;


