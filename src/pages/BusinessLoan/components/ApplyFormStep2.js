import React, { useEffect, useState } from "react";
import FormButton from "../../../components/Buttons/FormButton";
import FormSelect from "../../PreApprovedNew/Components/FormSelectBtn";
import FormSelectSearchable from "../../PreApprovedNew/Components/FormSelectSerachableBtn";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setLead } from "../../../store/app/appReducer";
import { setUserClickData } from "../../../utility/setUserClickData";
import FormInput from "../../PreApprovedNew/Components/FormInputBtn";
import BusinessAddressBox from "./BusinessAddressBox";
import industryOptions from "../../../constants/industries.json";
import callApi from "../../../utility/apiCaller";
import { toast } from "react-toastify";

const turnoverOptions = [
  { value: "", label: "Select Annual Turnover" },
  { value: "10L-50L", label: "10 Lakhs to 50 Lakhs" },
  { value: "50L-1Cr", label: "50 Lakhs to 1 Crore" },
  { value: "1Cr-5Cr", label: "1 Crore to 5 Crore" },
  { value: "5Cr+", label: "Above 5 Crore" },
];

const ownershipOptions = [
  { value: "", label: "Select Ownership Type" },
  { value: "Sole Proprietorship", label: "Sole Proprietorship" },
  { value: "Partnership", label: "Partnership" },
  { value: "Private Limited", label: "Private Limited Company (PVT LTD)" },
  { value: "LLP", label: "Limited Liability Partnership (LLP)" },
  { value: "Other", label: "Other" },
];

const ApplyFormStep2 = ({ formData, setFormData, nextStep, previousStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    annual_turnover: "",
    industry: null,
    confirm_business_address: "",
    address_type: "",
    ownership: "",
  });

  useEffect(() => {
    console.log("Received GST Number in Step 2:", formData.gst_no);
    console.log("Received Udyam Number in Step 2:", formData.udyam_number);
    console.log("Received Work Address in Step 2:", formData.work_address1);
  }, [formData]);

  useEffect(() => {
    if (formData.work_address1) {
      console.log("Updating confirm_business_address:", formData.work_address1);
      setData((prev) => ({
        ...prev,
        confirm_business_address: formData.work_address1,
      }));
    }
  }, [formData.work_address1]);

  const handleDataChange = (keyName, keyValue) => {
    setData((prevData) => ({ ...prevData, [keyName]: keyValue }));
    setFormData((prev) => ({ ...prev, [keyName]: keyValue }));
  };

  const handleBlur = (keyName) => {
    if (data[keyName] === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [keyName]: "This field is required.",
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[keyName];
        return newErrors;
      });
    }
  };

  // Validation
  const isFormValid =
    data.annual_turnover &&
    data.industry &&
    data.confirm_business_address &&
    data.address_type &&
    data.ownership;

  const handleSubmit = async () => {
    setUserClickData({ event_name: "step2-business-loan-page" });

    if (data.confirm_business_address) {
      setFormData((prev) => ({
        ...prev,
        work_address1: data.confirm_business_address,
      }));
    }

    if (isFormValid) {
      const payload = {
        businessloanlead: {
          contact_phone: formData.mobile,
          pan_no: formData.pancard,
          work_address1: data.confirm_business_address,
          address_type: data.address_type,
          ownership: data.ownership,
          annual_turnover: data.annual_turnover,
          industry: data.industry,
          is_stage2_completed: true,
        },
      };

      try {
        const leadResponse = await callApi(
          "v1/businessloanlead/new",
          "post",
          payload,
          "core"
        );

        if (leadResponse.status === "Success") {
          console.log("Business Loan Lead Updated:", leadResponse.data);
          toast.success("Business loan lead updated successfully.");
        } else {
          console.warn("Failed to update business loan lead:", leadResponse);
          toast.error("Failed to update business loan lead.");
        }
      } catch (err) {
        console.error("API Error:", err);
        toast.error("An error occurred while updating the business loan lead.");
      }

      dispatch(setLead({ ...data, stepDone: 2 }));
      nextStep();
    } else {
      setErrors({
        annual_turnover: !data.annual_turnover ? "Required" : "",
        industry: !data.industry ? "Required" : "",
        confirm_business_address: !data.confirm_business_address
          ? "Required"
          : "",
        address_type: !data.address_type ? "Required" : "",
        ownership: !data.ownership ? "Required" : "",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-between p-4">
      <img className="mt-4 w-36" src="/assets/img/logo.png" alt="Logo" />

      <div className="flex flex-col w-full max-w-md flex-grow justify-center">
        {/* Annual Turnover */}
        <FormSelect
          icon={
            <img
              src="/assets/icons/income.png"
              className="h-6 px-2"
              alt="Annual Income"
            />
          }
          label="Annual Turnover"
          name="annual_turnover"
          options={turnoverOptions}
          value={data.annual_turnover}
          onChange={(value) => handleDataChange("annual_turnover", value)}
          onBlur={() => handleBlur("annual_turnover")}
          isValid={!errors.annual_turnover}
          errorMessage={errors.annual_turnover}
        />

        {/* Industry */}
        <FormSelectSearchable
          icon={
            <img
              src="/assets/icons/profession.png"
              className="h-6 px-2"
              alt="Industry"
            />
          }
          label="Industry"
          name="industry"
          options={industryOptions}
          value={data.industry}
          onChange={(value) => handleDataChange("industry", value)}
          isValid={!errors.industry}
          errorMessage={errors.industry}
        />

        {/* Confirm Business Address */}
        <BusinessAddressBox
          data={{
            ...formData,
            confirm_business_address: formData.confirm_business_address || "",
          }}
          handleDataChange={handleDataChange}
        />

        {/* Ownership */}
        <FormSelect
          icon={
            <img
              src="/assets/icons/Icon C Type.png"
              className="h-6 px-2"
              alt="Ownership"
            />
          }
          label="Ownership"
          name="ownership"
          options={ownershipOptions}
          value={data.ownership}
          onChange={(value) => handleDataChange("ownership", value)}
          onBlur={() => handleBlur("ownership")}
          isValid={!errors.ownership}
          errorMessage={errors.ownership}
        />
      </div>

      {/* Buttons */}
      <div className="flex w-full max-w-md gap-1">
        <FormButton
          className="w-1/2 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-3 rounded-lg"
          style={{ minWidth: "140px" }}
          onClick={previousStep}
        >
          Back
        </FormButton>
        <FormButton
          className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg disabled:bg-gray-400"
          style={{ minWidth: "140px" }}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          Submit
        </FormButton>
      </div>
    </div>
  );
};

export default ApplyFormStep2;
