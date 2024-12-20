import { useState } from "react";
import Verification from "./components/Verification";
import "./css/Verification.css";

const CheckOffers_v2 = () => {
  const [formData, setFormData] = useState({
    utm_campaign: "",
    utm_source: "",
    utm_medium: "",
    utm_content: "",
    click_id: "",
    aff_id: "",
  });

  return (
    <div
      className={"personal-loan-container"}
      style={{
        maxHeight: "100vh",
      }}
    >
      <Verification refName={"finbud"} refId={"check-offers-v2"} campaignName={"finbud"} formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default CheckOffers_v2;
