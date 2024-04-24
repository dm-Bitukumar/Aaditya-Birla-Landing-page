import "./css/personal-details.css";
import WorkDetailsForm from "./components/WorkDetailsForm";
import { useEffect, useState } from "react";
import StepWizard from "react-step-wizard";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
      navigate("/personal-loan", { replace: true });
    }
  }, [user]);

  const [data, setData] = useState({});
  const [step, setStep] = useState(0);

  return (
    <div className={"form-signin-container pt-0"}>
      <StepWizard
        transitions={noTransitions}
        initialStep={step}
        onStepChange={({ activeStep }) => setStep(activeStep)}
      >
        <PersonalDetailsForm updateData={setData} updateStep={setStep} />
        <WorkDetailsForm setStep={setStep} profession={data.profession} />
      </StepWizard>
    </div>
  );
};

export default PersonalDetails;
