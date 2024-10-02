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

const PersonalDetails = () => {
  const user = useSelector((state) => state.app.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/fb/lp01", { replace: true });
    }
  }, [user]);
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const [step, setStep] = useState(1);

  return (
    <div className={"form-signin-container pt-0"}>
      <StepWizard
        transitions={noTransitions}
        initialStep={step}
        onStepChange={({ activeStep }) => setStep(activeStep)}
      >
        <PersonalDetailsForm />
        <WorkDetailsForm />
        <OfferDetailsSegment />
      </StepWizard>
    </div>
  );
};

export default PersonalDetails;
