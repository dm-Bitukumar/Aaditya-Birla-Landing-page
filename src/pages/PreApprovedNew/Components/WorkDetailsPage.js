import React, { useState } from "react";
import Stepper from "../../../components/Form/Stepper";
import { setUserClickData } from "../../../utility/setUserClickData";
import _ from "lodash";
import "./PreApproved.css";
import FormSelect from "../../../components/Form/FormSelect";
import FormInput from "../../../components/Form/FormInput";
import FormButton from "../../../components/Buttons/FormButton";
import HeadBar from "../../../components/Static/HeadBar";

const profession_options = [
  { label: "Salaried", value: "Salaried" },
  { label: "Self Employed", value: "self employed" },
  { label: "Business Owner", value: "business owner" },
];

const company_type_options = [
  { label: "Private Limited", value: "Private Limited" },
  { label: "Public Limited", value: "Public Limited" },
  {
    label: "Limited liability partnership (LLP)",
    value: "Limited liability partnership (LLP)",
  },
  { label: "Partnership", value: "Partnership" },
  { label: "Proprietorship", value: "Proprietorship" },
  { label: "Government", value: "Government" },
  { label: "One Person Company", value: "One Person Company" },
];

const turnoverOptions = [
  { label: "0-25K", value: "0-25K" },
  { label: "25K-1 Lac", value: "25K-1 Lac" },
  { label: "1-5 Lacs", value: "1-5 Lacs" },
  { label: "5-25 Lacs", value: "5-25 Lacs" },
  { label: "25 Lacs+", value: "25 Lacs+" },
];

const WorkDetailsPage = ({ setStep, setUserData, data }) => {
  const [workDetails, setWorkDetails] = useState(data ||{
    profession: "",
    companyName: "",
    companyType: "",
    income: "",
    workEmail: "",
    workAddress1: "",
    workAddress2: "",
    workPinCode: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setWorkDetails((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateInputs = () => {
    const validationErrors = {};
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!workDetails.profession.trim())
      validationErrors.profession = "Please enter your profession.";
    if (!workDetails.companyName.trim())
      validationErrors.companyName = "Please enter your company name.";
    if (!workDetails.companyType.trim())
      validationErrors.companyType = "Please enter your company type.";
    if (!workDetails.income.trim())
      validationErrors.income = "Please enter a valid monthly income.";
    if (!workDetails.workEmail || !emailRegex.test(workDetails.workEmail))
      validationErrors.workEmail = "Please enter a valid work email.";
    if (!workDetails.workAddress1.trim())
      validationErrors.workAddress1 = "Work Address Line 1 is required.";
    if (!workDetails.workPinCode || workDetails.workPinCode.length !== 6)
      validationErrors.workPinCode = "Please enter a valid 6-digit Work PIN code.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = () => {
    setUserClickData({
      event_name: "work-detail-form-submit",
    });

    if (validateInputs()) {
      setUserData((prev) => {
        const updatedData = { ...prev, workDetails }; 
        console.log("Form Data:", updatedData); 
        return updatedData;
      });
  
      setStep(6); 
    }
  };

  return (
    <div className="form-container">
      <HeadBar />
      <Stepper steps={["Personal Details", "Work Details", "Offer Page"]} currentStep={1} />
      <FormSelect
        options={profession_options}
        placeholder="profession"
        required
        id="profession"
        value={workDetails.profession}
        onChange={(selectedOption) => handleChange("profession", selectedOption?.value || selectedOption)}
        errorMessage={errors.profession}
        isValid={!errors.profession}
        icon={
          <img 
            src="/assets/icons/profession.png" 
            style={{ height: "25px" }} 
          />
        }
        label={"Profession"}
      />

      <FormInput
        icon={
          <img 
            src="/assets/icons/cname.png" 
            style={{ height: "25px" }} 
          />
        }
        type="text"
        name="companyName"
        value={workDetails.companyName}
        onChange={(e) => handleChange("companyName", e.target.value)}
        placeholder="Company Name"
        label="Company Name"
        isValid={!errors.companyName}
        errorMessage={errors.companyName}
      />

      <FormSelect
        options={company_type_options}
        icon={
          <img 
            src="/assets/icons/cname.png" 
            style={{ height: "25px" }} 
          />
        }
        type="text"
        name="companyType"
        value={workDetails.companyType}
        onChange={(selectedOption) => handleChange("companyType", selectedOption?.value || selectedOption)}
        placeholder="Company Type"
        label="Company Type"
        isValid={!errors.companyType}
        errorMessage={errors.companyType}
      />

      <FormSelect
        options={turnoverOptions}
        icon={
          <img 
            src="/assets/icons/income.png" 
            style={{ height: "25px" }} 
          />
        }
        type="number"
        name="income"
        value={workDetails.income}
        onChange={(selectedOption) => handleChange("income", selectedOption?.value || selectedOption)}
        placeholder="Monthly Income"
        label="Monthly Income"
        isValid={!errors.income}
        errorMessage={errors.income}
      />

      <FormInput
        icon={
          <img 
            src="/assets/icons/email.png" 
            style={{ height: "25px" }} 
          />
        }
        type="email"
        name="workEmail"
        value={workDetails.workEmail}
        onChange={(e) => handleChange("workEmail", e.target.value)}
        placeholder="Work Email"
        label="Work Email"
        isValid={!errors.workEmail}
        errorMessage={errors.workEmail}
      />

      <FormInput
        icon={
          <img 
            src="/assets/icons/pincode.png" 
            style={{ height: "25px" }} 
          />
        }
        type="text"
        name="workAddress1"
        value={workDetails.workAddress1}
        onChange={(e) => handleChange("workAddress1", e.target.value)}
        placeholder="Work Address Line 1"
        label="Work Address Line 1"
        isValid={!errors.workAddress1}
        errorMessage={errors.workAddress1}
      />

      <FormInput
        icon={
          <img 
            src="/assets/icons/pincode.png" 
            style={{ height: "25px" }} 
          />
        }
        type="text"
        name="workAddress2"
        value={workDetails.workAddress2}
        onChange={(e) => handleChange("workAddress2", e.target.value)}
        placeholder="Work Address Line 2"
        label="Work Address Line 2"
        isValid={true}
      />

      <FormInput
        icon={
          <img 
            src="/assets/icons/pincode.png" 
            style={{ height: "25px" }} 
          />
        }
        type="number"
        name="workPinCode"
        value={workDetails.workPinCode}
        onChange={(e) => handleChange("workPinCode", e.target.value)}
        placeholder="Work PIN Code"
        label="Work PIN Code"
        isValid={!errors.workPinCode}
        errorMessage={errors.workPinCode}
      />

      <div
        className="button-container"
        style={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <FormButton 
          type={"secondary"} 
          onClick={() => {
            setUserData((prev) => ({ ...prev, workDetails })); 
            setStep(4); 
          }}
        >
          Back
        </FormButton>
        <FormButton onClick={handleSubmit}>Submit</FormButton>
      </div>
    </div>
  );
};

export default WorkDetailsPage;
