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
import { setUserClickData } from "../../utility/setUserClickData";
import DocumentUploadForm from "./Components/LeadCaptureForm/DocumentUploadForm";

const LandingPage = () => {
  const [isFormStarted, setIsFormStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [params] = useSearchParams();
  useEffect(() => {
    window.onbeforeunload = () => {
      sessionStorage.removeItem("isFormStarted");
    };

    const sessionFlag = sessionStorage.getItem("isFormStarted");
    if (sessionFlag === "true") {
      setIsFormStarted(true);
    }
    setUserClickData({
      event_name: "pageview-website-pl-pan",
      user_id: "No User ID found here",
      affiliate_id: params.get("aff_id") || "No Aff_id found",
    });
  }, []);

  return (
    <>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5MF6MDPF"
          height="0"
          width="0"
          style="display:none;visibility:hidden"
        ></iframe>
      </noscript>
      <div className={"landing-page-container"} style={{ maxHeight: "100vh" }}>
        <div className={"landing-page-v1"}>
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
          {isFormStarted && currentStep !== 6 && (
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
                  if (currentStep === 4) {
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
              <LeadCaptureForm
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
              <PanCaptureForm
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
              <PersonalDetailsForm
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

            {currentStep === 5 && (
              <DocumentUploadForm
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

            {currentStep === 6 && (
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
              {/* <Testimonials /> */}
              <div id="faqs">
                <FAQSection />
              </div>
              <Footer />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
