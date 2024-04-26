import { useState } from "react";
import "./css/personal-loan.css";
import Form from "./components/Form";
import HeadBar from "../../components/Static/HeadBar";

const PersonalLoan = () => {
  const [formData, setFormData] = useState({
    utm_campaign: "",
    utm_source: "",
    utm_medium: "",
    utm_content: "",
    click_id: "",
    aff_id: "",
  });

  return (
    <div className={"personal-loan-container"}>
      <HeadBar />
      <Form formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default PersonalLoan;
