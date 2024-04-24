import { useState } from "react";
import HeadBar from "../../components/Static/HeadBar";
import StepWizard from "react-step-wizard";
import ApplyFormStep1 from "./components/ApplyFormStep1";
import ApplyFormStep2 from "./components/ApplyFormStep2";

let noTransitions = {
  enterRight: "",
  enterLeft: "",
  exitRight: "",
  exitLeft: "",
};

const BusinessLoanApply = () => {
  const [formData, setFormData] = useState({
    utm_campaign: "",
    utm_source: "",
    utm_medium: "",
    utm_content: "",
    click_id: "",
    aff_id: "",
  });
  const [step, setStep] = useState(0);

  return (
    <div className={"personal-loan-container"} style={{ maxHeight: "100vh" }}>
      <HeadBar />
      <StepWizard
        transitions={noTransitions}
        initialStep={step}
        onStepChange={({ activeStep }) => setStep(activeStep)}
      >
        <ApplyFormStep1 formData={formData} setFormData={setFormData} />
        <ApplyFormStep2 formData={formData} setFormData={setFormData} />
      </StepWizard>
    </div>
  );
};

export default BusinessLoanApply;
