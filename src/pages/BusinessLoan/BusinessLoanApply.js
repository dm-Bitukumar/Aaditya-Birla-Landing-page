import { useState, useEffect } from "react";
import HeadBar from "../../components/Static/HeadBar";
import StepWizard from "react-step-wizard";
import ApplyFormStep1 from "./components/ApplyFormStep1";
import ApplyFormStep2 from "./components/ApplyFormStep2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OfferDetailsSegment from "./components/OfferDetailsSegment";
import UploadFiles from "./components/UploadFiles";
import ConfirmationPage from "./components/ConfirmationPage";

let noTransitions = {
  enterRight: "",
  enterLeft: "",
  exitRight: "",
  exitLeft: "",
};

const BusinessLoanApply = () => {
  const user = useSelector((state) => state.app.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/business-loan", { replace: true });
    }
  }, [user]);

  // const [formData, setFormData] = useState({
  //   utm_campaign: "",
  //   utm_source: "",
  //   utm_medium: "",
  //   utm_content: "",
  //   click_id: "",
  //   aff_id: "",
  // });
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gst_no: "",
    udyam_number: "",
  });
  

  return (
    <div className={"personal-loan-container"} style={{ maxHeight: "100vh" }}>
      <HeadBar />
      <StepWizard
        transitions={noTransitions}
        initialStep={step}
        onStepChange={({ activeStep }) => setStep(activeStep)}
      >
        <ApplyFormStep1 formData={formData} setFormData={setFormData}/>
        <ApplyFormStep2 formData={formData} setFormData={setFormData}/>
        {/* <UploadFiles /> */}
        {/* <ConfirmationPage /> */}
        <OfferDetailsSegment />
      </StepWizard>
    </div>
  );
};

export default BusinessLoanApply;
