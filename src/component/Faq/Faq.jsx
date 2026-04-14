import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import './Faq.css';

const faqs = [
 
  {
    question: "Q1. How can I book a cab?",
    answer: "You can book easily through our website or by calling us.",
  },
  {
    question: "Q2. Are there any hidden charges?",
    answer: "No, we provide transparent pricing.",
  },
  {
    question: "Q3. Is your cab service available 24/7?",
    answer: "Yes, our services are available anytime, anywhere.",
  },
  {
    question: "Q4. Do I need to pay full amount in advance?",
    answer: "No, only a small advance is required to confirm your booking.",
  },
  {
    question: "Q5. Will I get driver details before the trip?",
    answer: "Yes, driver and cab details are shared before your journey starts.",
  },
  {
    question: "Q6. Do you provide one-way cab services?",
    answer: "Yes, we offer both one-way and round-trip options.",
  },
  {
    question: "Q7. Which cities do you cover?",
    answer: "We provide services across all India.",
  },
  {
    question: "Q8. Are your drivers verified?",
    answer: "Yes, all drivers are background-checked and trained for safe travel.",
  },
  {
    question: "Q9. What if my cab is late or delayed?",
    answer: "Our team ensures on-time service, but in case of delays, we provide immediate support and updates.",
  },
  {
    question: "Q10. How can I contact customer support?",
    answer: "You can reach us via call or WhatsApp for quick assistance.",
  },
  {
    question: "Q11. Is luggage allowed during travel?",
    answer: "Yes, you can carry luggage as per the cab capacity.",
  },
  {
    question: "Q12. Are pets allowed in the cab?",
    answer: "Yes, pet-friendly rides are available on request.",
  }

];

const FAQSection = () => {
  return (
    <section className="faq-container ">
      <div className="container" >
        
        {/* Header with dots like the image */}
        <div className=" ">
          <div className="faq-title-wrapper">
            <h2 className=" main-heading  p-3 ">FAQ's</h2>
            <div className="dot-decoration d-none"></div>
          </div>
        </div>

        {/* Floating Accordion List */}
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={index} className="faq-card-item mb-3">
              <summary className="d-flex justify-content-between align-items-center">
                <span className="faq-question">{item.question}</span>
                <div className="icon-box">
                  <FaPlus className="plus-icon" />
                  <FaMinus className="minus-icon" />
                </div>
              </summary>
              <div className="faq-answer-content">
                <hr className="my-2 opacity-10" />
                <p className="mb-0 text-muted">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;