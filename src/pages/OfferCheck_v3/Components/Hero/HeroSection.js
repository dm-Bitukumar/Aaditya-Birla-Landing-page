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
     
      <h1 className="main-heading2_v3">Get Personal Loan</h1>
      <h1 className="main-heading3_v3">Offers in Minutes</h1>
       <div class="blts-points">
      <p className="main-heading4">Instant approval <span class="main-heading5">in just a click</span></p>
      <p className="main-heading4">Quick disbursal, <span class="main-heading5">no delays</span></p>
      <p className="main-heading4">Lowest interest rates <span class="main-heading5">guaranteed</span></p>
      <p className="main-heading4">100% paperless <span class="main-heading5">digital process</span></p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <hr className="small-line" />
      </div>
    </section>
  );
};

export default HeroSection;
