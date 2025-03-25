import React from 'react';
import Header from './Components/Header/Header';
import GoogleRatingCard from './Components/GoogleRatingCard/GoogleRatingCard';
import HeroSection from './Components/Hero/HeroSection';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className={"landing-page-container"} style={{ maxHeight: "100vh" }}>
      <Header />
      <GoogleRatingCard />
      <HeroSection />
      {/* Add next components here as you build */}
    </div>
  );
};

export default LandingPage;
