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

const PersonalDetails = ({ personalData, lender, utmMedium }) => {
  const user = useSelector((state) => state.app.user);
  const [pancard, setPancard] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [words, setWords] = useState("");
  const [data, setData] = useState({
    gender: "",
    dob: "",
    email: "",
    pincode: "",
    home_address1: "",
    home_address2: "",
  });
  const [datas, setDatas] = useState({
    profession: "",
    company_name: "",
    company_type: "",
    work_email: "",
    work_pincode: "",
    work_address1: "",
    work_address2: "",
  });
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
      {/* <StepWizard
        transitions={noTransitions}
        initialStep={step}
        onStepChange={({ activeStep }) => setStep(activeStep)}
      > */}
      {step === 1 ? (
        <PersonalDetailsForm
          lender={lender}
          data={data}
          setData={setData}
          setStep={setStep}
          pancard={pancard}
          setPancard={setPancard}
        />
      ) : step === 2 ? (
        <WorkDetailsForm
          setStep={setStep}
          datas={datas}
          setDatas={setDatas}
          setMonthlyIncome={setMonthlyIncome}
          monthlyIncome={monthlyIncome}
          words={words}
          setWords={setWords}
        />
      ) : (
        <OfferDetailsSegment
          personalData={personalData}
          utmMedium={utmMedium}
        />
      )}
      {/* </StepWizard> */}
    </div>
  );
};

export default PersonalDetails;
