
import "./OutstationSection.css";
import car from "/image/car.jpg";
const OutstationSection = () => {
  return (
    <section className="outstation-section">

        
      {/* LEFT YELLOW STRIP */}
       <div className="yellow-line-left"></div>

      
      <div className="container">
        <div className="row align-items-center">
<h1 className="main-title ss" style={{fontSize:"22px" }}>
              ByCab - Reliable{" "}
              <span style={{ color: "#fbbf24" }}>Outstation & Intercity Cab</span> Service Across India
            </h1>
          {/* LEFT CONTENT */}
          <div className="col-lg-6 mb-4 left-sec mb-lg-0">
<div className="content-box">

  {/* <div className="feature">
    <h5>💰 Smart One-Way Pricing</h5>
    <p>
      Pay only for one side • No hidden charges • Budget-friendly fares • Minimal advance
    </p>
  </div> */}

  {/* <div className="feature">
    <h5>🚗 Wide Cab Availability</h5>
    <p>
      Cabs across major cities • Multiple vehicle options • Book anytime, anywhere
    </p>
  </div> */}

  <div className="feature">
    <h5>🧳 Comfortable & Spacious Rides</h5>
    <p>
      Ample luggage space • Well-maintained cars • Perfect for long journeys
    </p>
  </div>

  <div className="feature">
    <h5>🛡️ Safe & Verified Drivers</h5>
    <p>
      Experienced drivers • Background-checked • Customer-friendly service
    </p>
  </div>

  <div className="feature">
    <h5>🌍 Pan India Travel Coverage</h5>
    <p>
      Intercity travel made easy • All routes covered • Reliable across India
    </p>
  </div>

  <div className="feature">
    <h5>🐾 Flexible Travel Options</h5>
    <p>
      Pet-friendly rides • Family trips • One-way & round trips available
    </p>
  </div>

  {/* <div className="feature">
    <h5>📲 Quick & Easy Booking</h5>
    <p>
      Simple booking process • Instant confirmation • Hassle-free experience
    </p>
  </div> */}

  {/* <p className="bottom-text">
    Book your ride with ByCab today – Safe, affordable, and stress-free travel.
  </p> */}

  <button
    className="book-btn"
    onClick={() => {
      document.getElementById("bookingForm").scrollIntoView({
        behavior: "smooth",
      });
    }}
  >
    BOOK NOW
  </button>
</div>
          </div>

          {/* RIGHT VIDEO */}
          <div className="col-lg-6 right-sec">
            <div className="video-wrapper">
              <img
                className="video-frame"
                src={car}
                alt="ByCab outstation cab"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OutstationSection;