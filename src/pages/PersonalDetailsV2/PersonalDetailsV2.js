import "./css/personal-details.css";
import WorkDetailsForm from "./components/WorkDetailsForm";
import { useEffect, useState } from "react";
import StepWizard from "react-step-wizard";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OfferDetailsSegment from "./components/OfferDetailsSegment";

let noTransitions = {
  enterRight: "",
  enterLeft: "",
  exitRight: "",
  exitLeft: "",
};

const PersonalDetailsV2 = () => {
  const user = useSelector((state) => state.app.user);
  const [mobile, setMobile] = useState(localStorage.getItem("mobile") || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/personal-loan", { replace: true });
    }
  }, [user]);

  const [step, setStep] = useState(1);

  return (
    <div className={"form-signin-container pt-0"}>
      <StepWizard
        transitions={noTransitions}
        initialStep={step}
        onStepChange={({ activeStep }) => setStep(activeStep)}
      >
        <PersonalDetailsForm mobile={mobile} />
        <WorkDetailsForm mobile={mobile} />
        <OfferDetailsSegment mobile={mobile}/>
      </StepWizard>
    </div>
  );
};

export default PersonalDetailsV2;
