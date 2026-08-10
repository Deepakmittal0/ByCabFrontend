
import React from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import "./FloatingButtons.css";

const FloatingButtons = () => {
  return (
    <>
      {/* Left - Call Button */}
      <a
        href="tel:+919045454224"
        className="floating-btn call-btn"
        aria-label="Call Us"
      >
        <FaPhoneAlt className="btn-icon" />
        <span className="btn-text">Call Us</span>
      </a>

      {/* Right - WhatsApp Button */}
      <a
        href="https://wa.me/918266998890"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="btn-icon" />
        <span className="btn-text">WhatsApp</span>
      </a>
    </>
  );
};

export default FloatingButtons;

