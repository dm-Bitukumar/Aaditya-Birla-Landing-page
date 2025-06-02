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
      <img src="/assets/img/LP Banner with content.png"/>
    </section>
  );
};

export default HeroSection;
