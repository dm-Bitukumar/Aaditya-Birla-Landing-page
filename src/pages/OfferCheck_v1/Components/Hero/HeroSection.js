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
      <h1 className="main-heading2">Get Personal Loan</h1>
      <h1 className="main-heading3">Offers in Minutes</h1>
      <p className="main-heading4">
        Instant approval, low interest rates, fully
        <br /> digital journey
      </p>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <hr className="small-line" />
      </div>
    </section>
  );
};

export default HeroSection;
