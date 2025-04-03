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
import { useSearchParams } from "react-router-dom";

const LandingPage = () => {
  const [isFormStarted, setIsFormStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [params] = useSearchParams();
  const [showOfferHeaderLogo, setShowOfferHeaderLogo] = useState(false);

  const affId = params.get("aff_id") || "";
  const utmSource = params.get("utm_source") || "";
  const source = params.get("source") || "";
  const utmMedium = params.get("utm_medium") || "";
  const utmTerm = params.get("utm_term") || "";
  console.log("affId, utmTerm, utmMedium, utmSource, source", affId, utmTerm, utmMedium, utmSource, source);
  useEffect(() => {
    window.onbeforeunload = () => {
      sessionStorage.removeItem("isFormStarted");
    };

    const sessionFlag = sessionStorage.getItem("isFormStarted");
    if (sessionFlag === "true") {
      setIsFormStarted(true);
    }
  }, []);

  console.log("isFormStarted", isFormStarted);
  console.log("currentStep", currentStep);

  useEffect(() => {
    const video = document.querySelector(".background-video1-v3");
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay failed:", error);
        });
      }
    }
  }, []);

  return (
    <div className={"landing-page-container2"} style={{}}>
      {!isFormStarted && (
        <>
          <video
            className="background-video1-v3"
            src="/assets/img/BG video.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
          />
          <img
            src="/assets/img/square check bg.svg"
            alt="Square Check Background"
            className="background-overlay-img"
          />
        </>
      )}

      <div className={"landing-page-v3"}>
        <Header isOfferPage={showOfferHeaderLogo} />

        {!isFormStarted && <GoogleRatingCard />}
        {!isFormStarted && (
          <div id="hero">
            <HeroSection />
          </div>
        )}
      </div>

      {!isFormStarted && <TaglineScroller />}

      <div>
        {isFormStarted && currentStep !== 3 && (
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
                if (currentStep === 2) {
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

          {currentStep === 2 && (
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

          {currentStep === 3 && (
            <OfferPage
              formData={formData}
              setFormData={setFormData}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              affId={affId}
              utmSource={utmSource}
              source={source}
              utmMedium={utmMedium}
              utmTerm={utmTerm}
              setShowOfferHeaderLogo={setShowOfferHeaderLogo}
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
            {/* <Testimonials /> */}
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
