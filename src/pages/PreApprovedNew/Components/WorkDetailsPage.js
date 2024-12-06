import React, { useState, useEffect  } from "react";
import Stepper from "../../../components/Form/Stepper";
import { setUserClickData } from "../../../utility/setUserClickData";
import _ from "lodash";
import "./PreApproved.css";
import FormSelect from "./FormSelectBtn";
import FormInput from "./FormInputBtn";
import FormButton from "./FormBtnNew";
import HeadBar from "../../../components/Static/HeadBar";
import callApi from "../../../utility/apiCaller";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setWorkDetails } from "../../../store/app/appReducer";

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

const WorkDetailsPage = ({ setStep, data: initialData = {}, handleDataChange, leadId }) => {
  const [data, setData] = useState({
    profession: initialData.profession || "",
    companyName: initialData.companyName || "",
    companyType: initialData.companyType || "",
    income: initialData.income || "",
    workEmail: initialData.workEmail || "",
    workAddress1: initialData.workAddress1 || "",
    workAddress2: initialData.workAddress2 || "",
    workPinCode: initialData.workPinCode || "",
  });

  const workDetails = initialData;
  const { lenderId } = useSelector((state) => state.app.lead);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [isTnCAgreed, setIsTnCAgreed] = useState(true);

  const lenderTerms = {
    name: "Prefr",
    tnc: "https://prefr.com/terms_and_conditions",
    privacy: "https://prefr.com/privacy_policy",
    consent: "https://prefr.com/bureau_consent",
  };

  useEffect(() => {
    setData({
      profession: initialData.profession || "",
      companyName: initialData.companyName || "",
      companyType: initialData.companyType || "",
      income: initialData.income || "",
      workEmail: initialData.workEmail || "",
      workAddress1: initialData.workAddress1 || "",
      workAddress2: initialData.workAddress2 || "",
      workPinCode: initialData.workPinCode || "",
    });
  }, [initialData]);

  const handleChange = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" })); 
    handleDataChange(key, value); 
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
    if (lenderId === "662752eb65fdba1a48d6e478" && !isTnCAgreed)
      validationErrors.tnc = "You must agree to the Terms and Conditions.";    

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async () => {
    setUserClickData({
      event_name: "work-detail-form-submit",
    });
  
    if (!leadId) {
      console.error("No lead ID provided.");
      return;
    }

    if (!isTnCAgreed && lenderId === "662752eb65fdba1a48d6e478") {
      toast.error("Please accept the Terms and Conditions to proceed.");
      return;
    }

    if (validateInputs()) {
      try {
        dispatch(
          setWorkDetails({
            monthlyIncome: data.income,
            professionType: data.profession,
            companyName: data.companyName,
          })
        );

        const response = await callApi(
          `v1/preapproved_lead/${leadId}/update`, 
          "post",
          {
            preapproved_lead: {
              company_name: data.companyName,
              company_type: data.companyType,
              monthly_income: data.income,
              profession: data.profession,
              work_address1: data.workAddress1,
              work_address2: data.workAddress2,
              if_professional_info_completed: true,
              work_contact_email: data.workEmail || "", 
              work_pincode: data.workPinCode || "", 
              is_tnc_agreed: isTnCAgreed,
            },
          },
          "core" 
        );
  
        if (response.status === "Success") {
          handleDataChange("workDetails", data); 
          toast.success("Work details updated successfully.");
          setStep(6);
        } else {
          console.error("Failed to update work details:", response.message);
          toast.error("Failed to update work details. Please try again.");
        }
      } catch (error) {
        console.error("Error while updating work details:", error);
        toast.error("An error occurred while updating work details.");
      } 
    } else {
      console.error("Validation failed. Please correct the errors and try again.");
    }
  };
  

  return (
    <div className="form-container">
      <HeadBar />
      <Stepper steps={["Personal Details", "Work Details", "Offer Page"]} currentStep={1} />
      <FormSelect
        options={profession_options}
        placeholder="Select Profession"
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
        placeholder="Select Company Type"
        label="Company Type"
        isValid={!errors.companyType}
        errorMessage={errors.companyType}
      />

      <FormInput
        icon={
          <img 
            src="/assets/icons/email.png" 
            style={{ height: "25px" }} 
          />
        }
        type="number"
        name="income"
        value={workDetails.income}
        onChange={(e) => handleChange("income", e.target.value)}
        placeholder="Enter Monthly Income"
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

      {lenderId === "662752eb65fdba1a48d6e478" && (
        <div className="mb-3 checkbox pull-left">
          <label className="tnc">
            <input
              onChange={(e) => setIsTnCAgreed(e.target.checked)}
              checked={isTnCAgreed}
              className="form-check-input"
              type="checkbox"
              name="is_tnc_agreed"
              value="Yes"
              style={{ fontSize: "10px", marginRight: "4px" }}
            />
            I have agreed to {lenderTerms.name}{" "}
            <a target="_blank" href={lenderTerms.tnc} style={{ color: "#00A9DD", fontSize: "10px" }}>
              <b>T&C</b>
            </a>{" "}
            and{" "}
            <a
              target="_blank"
              href={lenderTerms.privacy}
              style={{ color: "#00A9DD", fontSize: "10px" }}
            >
              <b>Privacy Policy</b>
            </a>{" "}
            consent to CKYC and{" "}
            <a
              target="_blank"
              href={lenderTerms.consent}
              style={{ color: "#00A9DD", fontSize: "10px" }}
            >
              <b>Authorized</b>
            </a>{" "}
            Prefr to retrieve my credit report.
          </label>
        </div>
      )}  

      <div
        className="button-container"
        style={{ display: "flex", justifyContent: "center", width: "100%", gap: "10px" }}
      >
        <FormButton type={"secondary"} onClick={() => setStep(4)}>
          Back
        </FormButton>

        <FormButton 
          onClick={handleSubmit}
        >
          Submit
        </FormButton>
      </div>
    </div>
  );
};

export default WorkDetailsPage;
