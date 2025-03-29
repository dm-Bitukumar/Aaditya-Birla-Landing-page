import React from "react";
import "./HeroSection.css";
import TaglineScroller from "./TaglineScroller";

const HeroSection = () => {
  return (
    <section className="hero">
      <h1 class="main-heading">Get Instant</h1>
      <h1 class="main-heading1">Personal Loan</h1>
      <br />
      <p class="disclaimer">
        *DigitMoney is associated with RBI registered Banks & NBFCs only
      </p>
      {/* <TaglineScroller /> */}
    </section>
  );
};

export default HeroSection;
