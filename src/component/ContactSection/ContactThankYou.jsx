import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./ContactThankYou.css";

const ContactThankYou = () => {
  return (
    <>
      <Navbar />
      <main className="contact-thank-you">
        <div className="contact-thank-you__inner">
          <div className="contact-thank-you__card">
            <div className="contact-thank-you__icon-wrap" aria-hidden>
              <FaCheckCircle className="contact-thank-you__icon" />
            </div>
            <h1 className="contact-thank-you__title">
              Thank you<span>!</span>
            </h1>
            <p className="contact-thank-you__text">
              We have received your message. Our team will get back to you as
              soon as possible.
            </p>
            <Link to="/" className="contact-thank-you__btn">
              <FaHome aria-hidden />
              Back to home
            </Link>
            <p className="contact-thank-you__hint">
              Need urgent help? Call{" "}
              <a href="tel:+919045454224" className="contact-thank-you__phone">
                +91 9045454224
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactThankYou;
