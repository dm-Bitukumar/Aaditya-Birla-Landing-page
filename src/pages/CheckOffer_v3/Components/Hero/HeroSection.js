import React from "react";
import "./HeroSection.css";
import TaglineScroller from "./TaglineScroller";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="background-container">
        {/* <div className="bg-image bg-one"></div>
        <div className="bg-image bg-two"></div> */}
      </div>
      <h1 className="main-heading">Get Instant</h1>
      <h1 className="main-heading1">Personal Loan</h1>
      <br />
      <p className="disclaimer">
        *DigitMoney is associated with RBI registered Banks & NBFCs only
      </p>
      {/* <TaglineScroller /> */}
    </section>
  );
};

export default HeroSection;
