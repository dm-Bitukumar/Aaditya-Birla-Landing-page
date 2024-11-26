import React, { useState } from "react";
import PersonalDetailsForm from "./PersonalDetailsForm";
import WorkDetailsPage from "./WorkDetailsPage";

const MainFormContainer = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalDetails: {
      name: "",
      gender: "",
      dob: "",
      email: "",
      address1: "",
      address2: "",
      pincode: "",
    },
    workDetails: {
      profession: "",
      companyName: "",
      companyType: "",
      income: "",
      workEmail: "",
      workAddress1: "",
      workAddress2: "",
      workPinCode: "",
    },
  });

  const handleDataChange = (section, key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [key]: value,
      },
    }));
  };

  const handleContinue = () => {
    console.log("Form Data:", formData); 
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalDetailsForm
            data={formData.personalDetails}
            setStep={setStep}
            setUserData={setUserData}
            handleDataChange={(key, value) =>
              handleDataChange("personalDetails", key, value)
            }
            onContinue={handleContinue} 
          />
        );
      case 2:
        return (
          <WorkDetailsPage
            data={formData.workDetails}
            setStep={setStep}
            handleDataChange={(key, value) =>
              handleDataChange("workDetails", key, value)
            }
            onContinue={handleContinue} 
          />
        );
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
};

export default MainFormContainer;