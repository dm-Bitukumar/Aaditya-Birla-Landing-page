import React from "react";
import "./KeyAdvantages.css";
import KeyAdvantageCard from "./KeyAdvantageCard";

const cardData = [
  {
    icon: "/assets/img/adv_new1.png",
    title: "Discover with ease",
    subtitle: "Compare Pre-qualified offers from RBI Approved lenders",
  },
  {
    icon: "/assets/img/adv_new2.png",
    title: "Snag instant savings",
    subtitle: "Select offers with lowest interest rates and processing",
  },
  {
    icon: "/assets/img/adv_new3.png",
    title: "Fast. Simple. Digital.",
    subtitle: "4-step process to instant approval & transfer",
  },
  {
    icon: "/assets/img/adv_new4.png",
    title: "No Hidden Costs, Ever",
    subtitle:
      "No hidden charges, no surprises—just honest information, always.",
  },
];

const KeyAdvantages = () => {
  return (
    <div className="key-advantage-section1-v3">
      <div className="advantage-header">
        <h3 className="advantage-title">Key Advantages</h3>
        <p className="advantage-subtext">
          We value your trust-Simple, fast, and reliable personal loans.
        </p>
      </div>
      <div className="advantage-grid1">
        {cardData.map((card, index) => (
          <KeyAdvantageCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default KeyAdvantages;
