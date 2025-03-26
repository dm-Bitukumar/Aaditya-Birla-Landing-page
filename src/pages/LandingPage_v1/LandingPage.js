import React from "react";
import Header from "./Components/Header/Header";
import GoogleRatingCard from "./Components/GoogleRatingCard/GoogleRatingCard";
import HeroSection from "./Components/Hero/HeroSection";
import TaglineScroller from "./Components/Hero/TaglineScroller";
import LeadCaptureForm from "./Components/LeadCaptureForm/LeadCaptureForm";
import "./LandingPage.css";
import KeyAdvantages from "./Components/KeyAdvantages/KeyAdvantages";
import BankingPartners from "./Components/BankingPartners/BankingPartners";
import HowItWorks from "./Components/HowItWorks/HowItWorks";

const LandingPage = () => {
  return (
    <div
      className={"landing-page-container"}
      style={{ maxHeight: "100vh", marginBottom: "400px" }}
    >
      <div className={"landing-page"}>
        <Header />
        <GoogleRatingCard />
        <HeroSection />
      </div>
      <div>
        <TaglineScroller />
      </div>
      <div style={{ marginTop: "40px" }}>
        <LeadCaptureForm />
        <KeyAdvantages />
        <BankingPartners />
        <HowItWorks />
      </div>
    </div>
  );
};

export default LandingPage;
