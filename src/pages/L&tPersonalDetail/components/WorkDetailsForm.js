import React, { useState, useEffect } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import Stepper from "../../../components/Form/Stepper";
import FormButton from "../../../components/Buttons/FormButton";
import _ from "lodash";
import WorkDetail from "./workDetail";
import ContinueBtn from "../../../components/Buttons/ContinueBtn";
import { useDispatch, useSelector } from "react-redux";
import { setLead, setOffers } from "../../../store/app/appReducer";
import { setUserClickData } from "../../../utility/setUserClickData";
import numberToWords from "../../../utility/numberToWords";
import { formatAmount } from "../../../utility/amountFormat";
import { toast } from "react-toastify";

const WorkDetailsForm = ({ nextStep, previousStep }) => {
  const dispatch = useDispatch();
  const lead = useSelector((state) => state.app.lead);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [words, setWords] = useState("");
  const [data, setData] = useState({
    profession: "",
    company_name: "",
    company_type: "",
    work_email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState("");

  const handleMonthlyIncome = (e) => {
    setErrors("");
    let inputValue = e.target.value;

    let formattedValue;
    formattedValue = formatAmount(inputValue);
    setMonthlyIncome(formattedValue);
    let numericValue = inputValue.replace(/[^\d]/g, "");
    if (numericValue) {
      setWords(_.startCase(numberToWords(Number(numericValue))));
    } else {
      setWords("");
    }
  };
  const handleDataChange = (key, value) => {
    setErrors("");

    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleValidate = () => {
    let isValid = true;
    setErrors("");
    const gstRegex = /^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[0-9a-zA-Z]{3}$/;
    // const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/;
    const emailRegex = new RegExp(
      /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/
    );
    const { profession, company_name, company_type, work_email, work_pincode } =
      data;

    if (_.isEmpty(company_name)) {
      isValid = false;
      setErrors("company_name");
      setErrorMessage("Please enter Company Name");
    } else if (_.isEmpty(company_type)) {
      isValid = false;
      setErrors("company_type");
      setErrorMessage("Please enter Company Type");
    } else if (_.isEmpty(monthlyIncome)) {
      isValid = false;
      setErrors("monthly_income");
      setErrorMessage("Please enter your Monthly Income");
    } else if (_.isEmpty(work_email)) {
      isValid = false;
      setErrors("work_email");
      setErrorMessage("Please enter Work Email");
    } else if (!emailRegex.test(work_email)) {
      isValid = false;
      setErrors("work_email");
      setErrorMessage("Please enter valid email");
    } else if (_.isEmpty(profession)) {
      isValid = false;
      setErrors("profession");
      setErrorMessage("Please select your profession");
    }

    return isValid;
  };

  const handleSubmit = () => {
    setUserClickData({
      event_name: "work-detail-form-button",
    });
    const isValid = handleValidate();
    if (isValid) {
      dispatch(
        setLead({
          ...data,
          monthly_income: monthlyIncome.replace(/[^\d]/g, ""),
          stepDone: 2,
        })
      );
      dispatch(setOffers([]));
      nextStep();
    }
  };

  const handleBack = () => {
    setUserClickData({
      event_name: "work-detail-back-button",
    });
    previousStep();
  };
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={"form-signin-apply "}>
      <HeadBar />
      <Stepper
        steps={["Personal Details", "Work Details", "Offer Page"]}
        currentStep={1}
      />
      <h1
        className="mb-3 h3 fw-normal"
        style={{ fontSize: "20px", marginTop: "3em" }}
      >
        Work Details
        {/* <strong>Upto 25 Lacs</strong> */}
      </h1>
      <WorkDetail
        data={data}
        words={words}
        monthlyIncome={monthlyIncome}
        handleMonthlyIncome={handleMonthlyIncome}
        errors={errors}
        errorMessage={errorMessage}
        handleDataChange={handleDataChange}
      />
      <div
        // className=""
        className={"d-flex gap-3 preApprovebutton"}
        style={{ background: "#fff" }}
      >
        <ContinueBtn
          className="!py-4 !px-6"
          type={"secondary"}
          onClick={handleBack}
        >
          Back
        </ContinueBtn>
        <ContinueBtn className="!py-4 !px-6" onClick={handleSubmit}>
          Continue
        </ContinueBtn>
      </div>
    </div>
  );
};

export default WorkDetailsForm;
