import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ContactSection.css";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import { useForm } from "@formspree/react";

const ContactSection = () => {
  const [state, handleSubmit] = useForm("mvzbwezz");
  const navigate = useNavigate();

  useEffect(() => {
    if (state.succeeded) {
      navigate("/contact/thank-you", { replace: true });
    }
  }, [state.succeeded, navigate]);

  return (
    <section className="contact-section">

      <div className="contact-container">

        {/* LEFT SIDE */}
        <div className="contact-left">
          <div className="con-data"><h2 className="main-heading con">Contact <span style={{color:"#fbbf24"}}> ByCab </span></h2>
          <p className="subtitle">
            Send us a message and we will get back to you as soon as possible!
          </p>
          </div>

          <div className="contact-info">
            <h4>Call us at</h4>
            <a href="tel:+919045454224" className="highlight">
              +91 9045454224
            </a>

            <h4>Email us at</h4>
            <p>bycab247@gmail.com</p>
          </div>

          <div className="social-icons">
 <a href="https://www.facebook.com/profile.php?id=61583529146506&sk=about"><FaFacebookF /></a>
            {/* <a href="#"><FaTwitter /></a> */}
            {/* <a href="#"><FaLinkedinIn /></a> */}
            <a href="https://www.instagram.com/bycab247/"><FaInstagram /></a>
            {/* <a href="#"><FaPinterestP /></a> */}
            <a href="https://www.youtube.com/@ByCab247"><FaYoutube /></a>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="contact-right">
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input name="name" id="name" type="text" placeholder="Enter your name" />

            <label>Email</label>
            <input name="email" id="email" type="email" placeholder="Enter your email id" />

            <label>Phone</label>
            <input name="phone" id="phone" type="text" placeholder="Enter your phone number" />

            <label>Your message</label>
            <textarea
            name="message"
            id="message"
              rows="5"
              placeholder="Tell us your thoughts and feelings..."
            ></textarea>

            <button type="submit" disabled={state.submitting}>
              {state.submitting ? "SENDING…" : "SUBMIT"}
            </button>
          </form>
        </div>

      </div>

      {/* RIGHT YELLOW LINE */}
      <div className="right-line"></div>

    </section>
  );
};

export default ContactSection;