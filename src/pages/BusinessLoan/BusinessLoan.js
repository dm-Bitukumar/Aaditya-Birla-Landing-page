import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeadBar from "../../components/Static/HeadBar";
import Form from "./components/Form";

const BusinessLoan = () => {
  const location = useLocation();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      utm_campaign: params.get("utm_campaign") || "",
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_content: params.get("utm_content") || "",
      click_id: params.get("click_id") || "",
      aff_id: params.get("aff_id") || "",
    };
  };

  const [formData, setFormData] = useState(getQueryParams);

  useEffect(() => {
    setFormData(getQueryParams());
  }, [location.search]);

  return (
    <div className={"personal-loan-container"} style={{ maxHeight: "100vh" }}>
      <HeadBar />
      <Form formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default BusinessLoan;
