import React, { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import GoogleRatingCard from "./Components/GoogleRatingCard/GoogleRatingCard";
import HeroSection from "./Components/Hero/HeroSection";
import TaglineScroller from "./Components/Hero/TaglineScroller";
import LeadCaptureForm from "./Components/LeadCaptureForm/LeadCaptureForm";
import "./LandingPage.css";
import KeyAdvantages from "./Components/KeyAdvantages/KeyAdvantages";
import BankingPartners from "./Components/BankingPartners/BankingPartners";
import HowItWorks from "./Components/HowItWorks/HowItWorks";
import EligibilityDocuments from "./Components/EligibilityDocuments/EligibilityDocuments";
import Testimonials from "./Components/Testimonials/Testimonials";
import FAQSection from "./Components/FAQSection/FAQSection";
import Footer from "./Components/Footer/Footer";
import ProgressHeader from "./Components/ProgressHeader";
import PanCaptureForm from "./Components/LeadCaptureForm/PanCaptureForm";
import PersonalDetailsForm from "./Components/LeadCaptureForm/PersonalDetailsForm";
import ProfessionalDetailsForm from "./Components/LeadCaptureForm/ProfessionalDetailsForm";
import { getProfessionalFormData } from "./Components/LeadCaptureForm/ProfessionalDetailsForm";
import OfferPage from "./Components/LeadCaptureForm/OfferSection/OffersPage";

const LandingPage = () => {
  const [isFormStarted, setIsFormStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  console.log(isFormStarted);
  useEffect(() => {
    window.onbeforeunload = () => {
      sessionStorage.removeItem("isFormStarted");
    };

    const sessionFlag = sessionStorage.getItem("isFormStarted");
    if (sessionFlag === "true") {
      setIsFormStarted(true);
    }
  }, []);

  return (
    <div
      className={"landing-page-container2"}
      style={{ marginBottom: "400px" }}
    >
      {(!isFormStarted || currentStep === 4) && (
        <video
          className="background-video1"
          src="/assets/img/BG video.mp4"
          autoPlay
          loop
          muted
        />
      )}

      <div className={"landing-page"}>
        <Header />

        {!isFormStarted && <GoogleRatingCard />}
        {!isFormStarted && (
          <div id="hero">
            <HeroSection />
          </div>
        )}
      </div>

      {!isFormStarted && <TaglineScroller />}

      <div>
        {isFormStarted && currentStep !== 4 && (
          <ProgressHeader
            step={currentStep}
            onBack={() => {
              if (currentStep === 1) {
                setIsFormStarted(false);
                setCurrentStep(1);
                sessionStorage.removeItem("isFormStarted");
                const form = document.getElementById("personal-loan-form");
                if (form?.resetOtpState) form.resetOtpState();
              } else {
                if (currentStep === 3) {
                  const latestData = getProfessionalFormData();
                  console.log("📦 Saving this to formData:", latestData);
                  setFormData((prev) => ({ ...prev, ...latestData }));
                }
                setCurrentStep((prev) => prev - 1);
              }
            }}
          />
        )}

        <div id="personal-loan-form">
          {currentStep === 1 && (
            <PersonalDetailsForm
              isFormStarted={isFormStarted}
              setIsFormStarted={() => {
                sessionStorage.setItem("isFormStarted", "true");
                setIsFormStarted(true);
              }}
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {currentStep === 3 && (
            <ProfessionalDetailsForm
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
              setIsFormStarted={() => {
                sessionStorage.setItem("isFormStarted", "true");
                setIsFormStarted(true);
              }}
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {currentStep === 4 && (
            <OfferPage
              formData={formData}
              setFormData={setFormData}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          )}
        </div>

        {!isFormStarted && (
          <>
            <KeyAdvantages />
            <div id="our-partners">
              <BankingPartners />
            </div>
            <HowItWorks />
            <EligibilityDocuments />
            <Testimonials />
            <div id="faqs">
              <FAQSection />
            </div>
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
