import React from "react";
import "./HowItWorks.css";

const stepData = [
  {
    id: 1,
    text: "Provide basic details.",
    className: "step-one",
  },
  {
    id: 2,
    text: "Compare and Select Offer.",
    className: "step-two",
  },
  {
    id: 3,
    text: "Complete Application Form.",
    className: "step-three",
  },
  {
    id: 4,
    text: "Sign Agreement and Loan amount is credited.",
    className: "step-four",
  },
];

const HowItWorks = () => {
  return (
    <div className="hiw-container-v3">
      <h2 className="hiw-heading">How it Works</h2>
      <div className="hiw-content-wrapper">
        <img
          src="/assets/img/How it works Green.png"
          alt="How it Works"
          className="hiw-image_v3"
        />
        <div className="hiw-text-wrapper">
          {stepData.map((step) => (
            <div key={step.id} className={`hiw-step ${step.className}`}>
              {step.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
