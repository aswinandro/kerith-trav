import React, { useEffect, useState} from "react";
import "./Irctc.css";
import calling from "../../assets/subscribe.jpg";
import Aos from "aos";
import "aos/dist/aos.css";


const Irctc = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [pnr, setPnr] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setPnr(e.target.value);
  };

  const fetchPNRData = async () => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const url = `https://api.railwayapi.com/v2/pnr-status/pnr/${pnr}/apikey/${apiKey}/`;

    try {
      const response = await axios.get(url);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch PNR data');
      setData(null);
    }
  };

  return (
    <div className="pnr-checker">
      <h1>PNR Status Checker</h1>
      <input
        type="text"
        value={pnr}
        onChange={handleInputChange}
        placeholder="Enter PNR number"
      />
      <button onClick={fetchPNRData}>Check PNR</button>
      {error && <p className="error">{error}</p>}
      {data && (
        <div className="pnr-data">
          <h2>PNR Data</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );  
};

export default Irctc;


