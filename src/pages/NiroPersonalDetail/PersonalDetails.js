import "./css/personal-details.css";
import WorkDetailsForm from "./components/WorkDetailsForm";
import { useEffect, useState } from "react";
import StepWizard from "react-step-wizard";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OfferDetailsSegment from "./components/OfferDetailsSegment";
import { setUserClickData } from "../../utility/setUserClickData";

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

  useEffect(() => {
    const event = getEventName(lender, step);

    if (event) {
      setUserClickData({
        event_name: event,
      });
    }
  }, [step]);

  const getEventName = (lender, step) => {
    if (lender === "niro") {
      return step === 1
        ? "fb-lp-basic"
        : step === 2
        ? "fb-lp-work"
        : "fb-lp-offer2";
    } else if (lender === "abfl") {
      return step === 1
        ? "abfl-lp-basic"
        : step === 2
        ? "abfl-lp-work"
        : "abfl-lp-offer2";
    } else if (lender === "l&t") {
      return step === 1
        ? "l&t-lp-basic"
        : step === 2
        ? "l&t-lp-work"
        : "l&t-lp-offer2";
    }
    return null;
  };

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
