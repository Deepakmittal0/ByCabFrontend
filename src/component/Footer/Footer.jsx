import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">

        {/* Popular Cities */}
<div className="popular-c">
  <div className="popular-cities">
    <h3 className="title">Popular Cities We Serve</h3>

    <div className="row">
      <div className="col">
        <div className="city-group">
          <h4>
            {/* 🌆 */}
             Major Cities We Cover</h4>
          <p>
            Delhi NCR | Mumbai | Bangalore | Hyderabad | Chennai | Kolkata | Pune | Ahmedabad
          </p>
        </div>
      </div>

      <div className="col">
        <div className="city-group">
          <h4>
            {/* 🚖  */}
            High-Demand Cities</h4>
          <p>
            Jaipur | Chandigarh | Lucknow | Indore | Bhopal | Nagpur | Surat | Kanpur | Patna | Coimbatore
          </p>
        </div>
      </div>

      <div className="col">
        <div className="city-group">
          <h4>
            {/* 🌍 */}
             Trending Travel Destinations</h4>
          <p>
            Agra | Udaipur | Jodhpur | VRINDAVAN | MATHURA | Amritsar | Dehradun | Haridwar | Rishikesh | Shimla | Manali | Goa | Varanasi | Mysore | Ooty | ETC
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

        <hr />

        {/* Services */}
        <div className="services">
          ONE WAY CAB | ROUND TRIP | AIRPORT TRANSFERS | LOCAL RENTALS |
          OUTSTATION TRAVEL | TEMPO TRAVELLER |LUXURY CARS | PET FRIENDLY RIDES
        </div>

        <hr />

        {/* Routes */}
        <div className="routes d-none">
          <div className="route-col">
            <h4>CAB FROM DELHI</h4>
            <a href="#">Taxi from Delhi to Agra</a>
            <a href="#">Taxi from Delhi to Jaipur</a>
            <a href="#">Taxi from Delhi to Chandigarh</a>
            <a href="#">Taxi from Delhi to Amritsar</a>
          </div>

          <div className="route-col">
            <h4>CAB FROM BANGALORE</h4>
            <a href="#">Taxi from Bangalore to Mysore</a>
            <a href="#">Taxi from Bangalore to Coorg</a>
            <a href="#">Taxi from Bangalore to Ooty</a>
            <a href="#">Taxi from Bangalore to Pondicherry</a>
          </div>

          <div className="route-col">
            <h4>CAB FROM MUMBAI</h4>
            <a href="#">Taxi from Mumbai to Shirdi</a>
            <a href="#">Taxi from Mumbai to Shani Shingnapur</a>
            <a href="#">Taxi from Mumbai to Mahabaleshwar</a>
            <a href="#">Taxi from Mumbai to Nashik</a>
          </div>

          <div className="route-col">
            <h4>CAB FROM CHENNAI</h4>
            <a href="#">Taxi from Chennai to Bangalore</a>
            <a href="#">Taxi from Chennai to Pondicherry</a>
            <a href="#">Taxi from Chennai to Tirupati</a>
            <a href="#">Taxi from Chennai to Mahabalipuram</a>
          </div>
        </div>

        {/* <div className="explore-route">+ Explore more routes</div> */}

        {/* <hr /> */}

        {/* App + Social */}
        <div className="footer-bottom">
          {/* <div className="app-buttons">
            <img src="https://cabbazar.com/assets/img/icons/playstore-badge.webp" alt="Google Play" />
            <img src="https://cabbazar.com/assets/img/icons/app-store-badge.webp" alt="App Store" />
          </div> */}


        </div>

          <div className="social-icons1 d-flex">
 <a href="https://www.facebook.com/profile.php?id=61583529146506&sk=about"><FaFacebookF /></a>
            {/* <a href="#"><FaTwitter /></a> */}
            {/* <a href="#"><FaLinkedinIn /></a> */}
            <a href="https://www.instagram.com/bycab247/"><FaInstagram /></a>
            {/* <a href="#"><FaPinterestP /></a> */}
            <a href="https://www.youtube.com/@ByCab247"><FaYoutube /></a>
          </div>

        <hr />

        {/* Footer Links */}
        <div className="footer-links">
        Privacy Policy | Terms & Conditions
          <br />
          Support: Help Center | +91 9045454224
        </div>

        {/* <hr /> */}
{/*  */}
        {/* Copyright */}

      </div>
    </footer>
  );
};

export default Footer;