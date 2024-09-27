import React, { useState } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import Stepper from "../../../components/Form/Stepper";
import FormButton from "../../../components/Buttons/FormButton";
import _ from "lodash";
import SalariedForm from "./SalariedForm";
import SelfEmployedForm from "./SelfEmployedForm";
import { useDispatch, useSelector } from "react-redux";
import { setLead, setOffers } from "../../../store/app/appReducer";
import { setUserClickData } from "../../../utility/setUserClickData";
import numberToWords from "../../../utility/numberToWords";
import { formatAmount } from "../../../utility/amountFormat";

const WorkDetailsForm = ({ nextStep, previousStep }) => {
  const dispatch = useDispatch();
  const lead = useSelector((state) => state.app.lead);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [words, setWords] = useState("");
  const [data, setData] = useState({
    company_name: "",
    company_type: "",
    // monthly_income: "",
    salary_mode: "",

    company_age: "",
    TypeOfBusiness: "",
    turnover: "",
    gst: "",
    gst_no: "",
    regd_proof: [],
    category: "",
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

    if (lead.profession === "Salaried") {
      const { company_name, company_type, salary_mode } = data;

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
      } else if (_.isEmpty(salary_mode)) {
        isValid = false;
        setErrors("salary_mode");
        setErrorMessage("Please select a Salary Mode");
      }
    } else {
      const {
        company_name,
        company_age,
        TypeOfBusiness,
        company_type,
        turnover,
        gst,
        category,
        gst_no,
        regd_proof,
      } = data;

      if (_.isEmpty(company_name)) {
        isValid = false;
        setErrors("company_name");
        setErrorMessage("Please enter Company Name");
      } else if (_.isEmpty(company_age)) {
        isValid = false;
        setErrors("company_age");
        setErrorMessage("Please select Company Age");
      } else if (_.isEmpty(TypeOfBusiness)) {
        isValid = false;
        setErrors("TypeOfBusiness");
        setErrorMessage("Please select Business Type");
      } else if (_.isEmpty(company_type)) {
        isValid = false;
        setErrors("company_type");
        setErrorMessage("Please select Company Type");
      } else if (_.isEmpty(turnover)) {
        isValid = false;
        setErrors("turnover");
        setErrorMessage("Please enter Average Monthly Sales");
      } else if (_.isEmpty(gst)) {
        isValid = false;
        setErrors("gst");
        setErrorMessage("Please select GST availability");
      } else if (gst === "Yes") {
        if (_.isEmpty(gst_no)) {
          isValid = false;
          setErrors("gst_no");
          setErrorMessage("Please enter GST Number");
        } else if (!gstRegex.test(gst_no)) {
          isValid = false;
          setErrors("gst_no");
          setErrorMessage("Please enter valid GST Number");
        } else if (_.isEmpty(category)) {
          isValid = false;
          setErrors("category");
          setErrorMessage("Please select a Category");
        }
      } else if (gst === "No") {
        if (_.isEmpty(regd_proof)) {
          isValid = false;
          setErrors("regd_proof");
          setErrorMessage("Please select a Registration Proof");
        } else if (_.isEmpty(category)) {
          isValid = false;
          setErrors("category");
          setErrorMessage("Please select a Category");
        }
      }
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
        setLead({ ...data, monthly_income: monthlyIncome, stepDone: 2 })
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

  const renderForm = () => {
    setUserClickData({
      event_name: "work-detail-page",
    });
    switch (lead.profession) {
      case "Salaried":
        return (
          <SalariedForm
            data={data}
            words={words}
            monthlyIncome={monthlyIncome}
            handleMonthlyIncome={handleMonthlyIncome}
            errors={errors}
            errorMessage={errorMessage}
            handleDataChange={handleDataChange}
          />
        );
      default:
        return (
          <SelfEmployedForm
            data={data}
            errors={errors}
            errorMessage={errorMessage}
            handleDataChange={handleDataChange}
          />
        );
    }
  };

  return (
    <div className={"form-signin-apply form-signin"}>
      <HeadBar />
      <Stepper
        steps={["Personal Details", "Work Details", "Offer Page"]}
        currentStep={1}
      />
      {renderForm()}
      <div
        className={"d-flex gap-3"}
        style={
          lead.profession === "Salaried"
            ? { position: "absolute", bottom: "10px" }
            : {}
        }
      >
        <FormButton type={"secondary"} onClick={handleBack}>
          Back
        </FormButton>
        <FormButton onClick={handleSubmit}>Continue</FormButton>
      </div>
    </div>
  );
};

export default WorkDetailsForm;
