import React, { useState, useEffect } from "react";
import "./LandingPage.css";

import OfferPage from "./Components/LeadCaptureForm/OfferSection/OffersPage";
import { useSearchParams } from "react-router-dom";
import { setUserClickData } from "../../utility/setUserClickData";
import { useSelector, useDispatch } from "react-redux";
import { setLead, setOffers } from "../../store/app/appReducer";
import callApi from "../../utility/apiCaller";
import Header from "./Components/Header/Header";

const LandingPage = () => {
  const [isFormStarted, setIsFormStarted] = useState(false);
  const [showOfferHeaderLogo, setShowOfferHeaderLogo] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [params] = useSearchParams();
  const affId = params.get("aff_id") || "";
  const leadId = params.get("lid") || "";
  const utmSource = params.get("utm_source") || "";
  const source = params.get("source") || "";
  const utmMedium = params.get("utm_medium") || "";
  const utmTerm = params.get("utm_term") || "";
  const adsName = params.get("ads_name") || "";
  const dispatch = useDispatch();

  useEffect(() => {
    window.onbeforeunload = () => {
      sessionStorage.removeItem("isFormStarted");
    };

    const sessionFlag = sessionStorage.getItem("isFormStarted");
    if (sessionFlag === "true") {
      setIsFormStarted(true);
    }
    setUserClickData({
      event_name: "pageview-check-offers-v4",
      user_id: "No User ID found here",
      affiliate_id: params.get("aff_id") || "No Aff_id found",
    });
    console.log(leadId);
    if (leadId) {
      getLntDefaultOffer();
    }
  }, []);

  const getLntDefaultOffer = async () => {
    const leadDetailsResponse = await callApi(
      "v1/lead/list",
      "post",
      {
        filters: { _id: leadId },
      },
      "core"
    );
    if (
      leadDetailsResponse?.data?.leadList[0]?.is_landt_finbud_success ===
        true &&
      leadDetailsResponse?.data?.leadList[0]?.is_landt_finbud_call_done === true
    ) {
      let landOffer = [
        {
          credit_limit: "500000",
          emi: "18388",
          tenure: "36",
          lead_id: leadId,
          lender_name: "L&T",
          isdefault: true,
          logo_image_url: "https://digitmoney.in/image/lt.png",
        },
      ];
      dispatch(setLead(leadDetailsResponse.data.leadList[0]));
      dispatch(setOffers(landOffer));
    }
  };

  return (
    <div className={"landing-page-container2"} style={{}}>
      <div className={"landing-page-v3"}>
        <Header isOfferPage={showOfferHeaderLogo} />
      </div>

      <div>
        <div id="personal-loan-form">
          {currentStep === 1 && (
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
      </div>
    </div>
  );
};

export default LandingPage;
