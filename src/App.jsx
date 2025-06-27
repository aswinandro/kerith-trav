import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Middle from "./Components/Middle/Middle";
import Destinations from "./Components/Destinations/Destinations";
import Portfolio from "./Components/Portfolio/Portfolio";
import Reviews from "./Components/Reviews/Reviews";
import Questions from "./Components/Questions/Questions";
import Subscribe from "./Components/Subscribe/Subscribe";
import Packages from "./Components/Packages/Packages";
import Footer from "./Components/Footer/Footer";
import { Link, Element } from "react-scroll";
import PaymentGateway from "./Components/Payment/Payment";
function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <Middle />
      <Element name="destinations">
        <Destinations />
      </Element>
      {/* <PaymentGateway/> */}
      <Element name="reviews">
        <Reviews />
      </Element>
      <Element name="packages">
        <Packages />
      </Element>
      <Element name="about">
        <Portfolio />
      </Element>
      
      <Subscribe />
      <Footer />
    </div>
  );
}

export default App;
