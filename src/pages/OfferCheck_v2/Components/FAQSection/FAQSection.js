import React, { useState } from "react";
import "./FAQSection.css";
import allFaqs from "./FAQData";

const FAQSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleFaqs = showAll ? allFaqs : allFaqs.slice(0, 4);

  const toggleIndex = (idx) => {
    setActiveIndex(idx === activeIndex ? null : idx);
  };

  return (
    <div className="faq-section">
      <h2 className="faq-heading">FAQs</h2>
      <p className="faq-subheading">Got questions? We’ve got answers!</p>

      <div className="faq-list">
        {visibleFaqs.map((faq, idx) => (
          <div
            key={idx}
            className={`faq-card ${activeIndex === idx ? "active" : ""}`}
            onClick={() => toggleIndex(idx)}
          >
            <div className="faq-question">
              <strong>{`${faq.question}`}</strong>
              <img
                src={
                  activeIndex === idx
                    ? "/assets/img/FAQs_minus.svg"
                    : "/assets/img/FAQ_plus.svg"
                }
                alt="toggle"
              />
            </div>
            {activeIndex === idx && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>

      {!showAll && (
        <button className="faq-load-more" onClick={() => setShowAll(true)}>
          Load More!
        </button>
      )}
    </div>
  );
};

export default FAQSection;
