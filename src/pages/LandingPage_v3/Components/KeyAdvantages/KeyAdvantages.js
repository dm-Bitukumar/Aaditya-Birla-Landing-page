import React from "react";
import "./KeyAdvantages.css";
import KeyAdvantageCard from "./KeyAdvantageCard";

const cardData = [
  {
    icon: "/assets/img/Key Advantage1.svg",
    title: "Discover with ease",
    subtitle: "Compare Pre-qualified offers from RBI Approved lenders",
  },
  {
    icon: "/assets/img/Key Advantage2.svg",
    title: "Unlock incredible savings",
    subtitle: "Select offers with lowest interest rates and processing",
  },
  {
    icon: "/assets/img/Key Advantage3.svg",
    title: "Faster Processing",
    subtitle: "Apply and get disbursal quickly",
  },
  {
    icon: "/assets/img/Key Advantage4.svg",
    title: "Faster Processing",
    subtitle: "Apply and get disbursal quickly",
  },
];

const KeyAdvantages = () => {
  return (
    <div className="key-advantage-section">
      <div className="advantage-header">
        <h3 className="advantage-title">Key Advantages</h3>
        <p className="advantage-subtext">
          We value your trust–Simple, fast, and reliable personal loans.
        </p>
      </div>
      <div className="advantage-scroll-wrapper">
        <div className="advantage-row">
          {cardData.map((card, index) => (
            <KeyAdvantageCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyAdvantages;
