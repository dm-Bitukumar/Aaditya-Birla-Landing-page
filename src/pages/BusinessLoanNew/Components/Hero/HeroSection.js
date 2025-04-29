import React from "react";
import "./HeroSection.css";
import TaglineScroller from "./TaglineScroller";

const HeroSection = () => {
  return (
    <section className="hero">
      <img
        src="/assets/img/3 lighting.svg"
        alt="Lightning Icon"
        className="hero-icon"
      />

      <h1 className="hero-heading">
        Get Instant <br /> Personal Loan
      </h1>

      {/* <TaglineScroller /> */}
    </section>
  );
};

export default HeroSection;
