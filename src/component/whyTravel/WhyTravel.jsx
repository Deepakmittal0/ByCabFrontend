import React from "react";
import "./WhyTravel.css";
// import why from "/image/why.jpg";

// import cabImage from "../assets/cab.jpg"; // apni image path yaha daal dena

const WhyTravel = () => {
  return (
    <section className="why-section">
      <div className="container">
        <div className="row align-items-center">
<h2 className="main-heading">
                Why Choose {" "}
                <span style={{ color: "#fbbf24" }}>ByCab</span> ?
              </h2>
          {/* Left Image */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="image-wrapper">
              <img src="./image/whychoose.jpeg" alt="Cab Travel" className="img-fluid1 rounded-img" />
            </div>
          </div>

          {/* Right Content */}
          <div className="col-lg-6">
<div className="content-wrapper">

  <div className="feature-block">
    <h5>🚖 Comfortable & Clean Rides</h5>
    <p>Hygienic vehicles • Regularly sanitized • Fresh & well-maintained cars</p>
  </div>

  <div className="feature-block">
    <h5>💰 Honest & Transparent Pricing</h5>
    <p>No hidden charges • Clear fare breakdown • Pay exactly what you see</p>
  </div>

  <div className="feature-block">
    <h5>⏱️ Always On-Time Service</h5>
    <p>Quick confirmations • Punctual pickups • Smooth travel experience across cities</p>
  </div>

  <div className="feature-block">
    <h5>👨‍✈️ Verified & Trained Drivers</h5>
    <p>Polite & professional drivers • Safety-first approach • Customer-friendly behavior</p>
  </div>

  {/* <div className="feature-block">
    <h5>🌍 All India Coverage</h5>
    <p>Pan India availability • Easy intercity travel • Reliable service in multiple cities</p>
  </div> */}

  <div className="feature-block">
    <h5>📲 Easy & Instant Booking</h5>
    <p>Fast online booking • Simple interface • Book your ride in just a few clicks</p>
  </div>

  <div className="feature-block">
    <h5>🧳 Multiple Travel Options</h5>
    <p>Local rides • Outstation trips • Airport transfers • One-way & round trips</p>
  </div>

 <p className="bottom-text">
    Book your ride with ByCab today – Safe, affordable, and stress-free travel.
  </p>

  <button
    className="book-btn mt-3"
    onClick={() => {
      document.getElementById("bookingForm").scrollIntoView({
        behavior: "smooth",
      });
    }}
  >
    BOOK CAB
  </button>

</div>
          </div>

        </div>
      </div>

         {/* ✅ RIGHT YELLOW LINE */}
      {/* <div className="yellow-line"></div> */}
    </section>
  );
};

export default WhyTravel;