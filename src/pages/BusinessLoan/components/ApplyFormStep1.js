import { useEffect, useState } from "react";
import _ from "lodash";
import FormButton from "../../../components/Buttons/FormButton";
import OtpInputForm from "../../../components/Form/OtpInputForm";
import { useNavigate } from "react-router";
import GstRegistrationOption from "./GstRegistrationOption";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setLead } from "../../../store/app/appReducer";
import { setUserClickData } from "../../../utility/setUserClickData";
import FormInput from "../../PreApprovedNew/Components/FormInputBtn";
import FormSelect from "../../PreApprovedNew/Components/FormSelectBtn";
import { toast } from "react-toastify";

const residential_type_options = [
  { value: "", label: "Select Residential Type" },
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
  { value: "Industrial", label: "Industrial" },
];

const ApplyFormStep1 = ({ formData, setFormData, nextStep, ...props }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({
    pan_card: "",
    residence_pincode: "",
    residential_type: "",
    gst_available: "",
    gst_no: "",
  });
  const [touched, setTouched] = useState({
    pan_card: false,
    residence_pincode: false,
    residential_type: false,
    gst_no: false,
  });
  const navigate = useNavigate();
  const udyamRegex = /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/;

  const handleDataChange = (keyName, keyValue) => {
    setData((prevData) => {
      let updatedData = { ...prevData, [keyName]: keyValue };

      if (keyName === "udyam_number") {
        let formattedValue = keyValue.toUpperCase().replace(/[^A-Z0-9-]/g, "");
        updatedData.udyam_number = formattedValue;
      }

      if (keyName === "gst_available" && keyValue === "no") {
        updatedData.gst_no = "";
      }

      if (keyName === "gst_available") {
        updatedData.udyam_available = "";
        updatedData.udyam_number = "";
      }

      return updatedData;
    });
  };

  const handleBlur = (keyName) => {
    setTouched((prevTouched) => ({ ...prevTouched, [keyName]: true }));
    handleValidation();
  };

  const handleValidation = () => {
    let validationErrors = {};
    let isValid = true;

    const gstRegex = /^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[0-9a-zA-Z]{3}$/;

    if (
      touched.pan_card &&
      data.pan_card &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.pan_card)
    ) {
      validationErrors.pan_card = "Please enter a valid PAN Card";
      isValid = false;
    }

    if (
      touched.residence_pincode &&
      data.residence_pincode &&
      !/^\d{6}$/.test(data.residence_pincode)
    ) {
      validationErrors.residence_pincode = "Please enter a valid Pincode.";
      isValid = false;
    }

    if (touched.residential_type && data.residential_type === "") {
      validationErrors.residential_type = "Please select Residential Type.";
      isValid = false;
    }

    if (touched.gst_no && data.gst_available === "yes") {
      if (_.isEmpty(data.gst_no)) {
        validationErrors.gst_no = "Please enter GST Number.";
        isValid = false;
      } else if (!gstRegex.test(data.gst_no)) {
        validationErrors.gst_no = "Please enter a valid GST Number.";
        isValid = false;
      }
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = () => {
    setUserClickData({
      event_name: "step1-business-loan-page",
    });

    const isValid = handleValidation();
    if (isValid) {
      nextStep();
      dispatch(setLead({ ...data, stepDone: 1 }));
    }
  };

  const isFormValid =
    !!data.pan_card &&
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.pan_card) &&
    !!data.residence_pincode &&
    data.residence_pincode.length === 6 &&
    !!data.residential_type &&
    data.gst_available !== "" &&
    (data.gst_available === "yes"
      ? !!data.gst_no &&
        data.gst_no?.length === 15 &&
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{3}$/.test(data.gst_no)
      : data.udyam_available === "yes"
      ? !!data.udyam_number && udyamRegex.test(data.udyam_number)
      : true);

  return (
    <div className="flex flex-col min-h-screen items-center justify-between p-4">
      <img className="mt-4 w-36" src="/assets/img/logo.png" alt="Logo" />

      <div className="flex flex-col w-full max-w-md flex-grow justify-center">
        {/* PAN Card Field */}
        <FormInput
          icon={
            <img src="/assets/icons/pancard.png" className="h-6" alt="PAN" />
          }
          type="text"
          name="pan_card"
          placeholder="PAN Card Number"
          label="PAN Card"
          value={data.pan_card}
          onChange={(e) =>
            handleDataChange("pan_card", e.target.value.toUpperCase())
          }
          onBlur={() => handleBlur("pan_card")}
          isValid={!errors.pan_card}
          errorMessage={errors.pan_card}
        />

        {/* Residence Pincode Field */}
        <FormInput
          icon={
            <img
              src="/assets/icons/pincode.png"
              className="h-6 px-2"
              alt="Pincode"
            />
          }
          type="text"
          name="residence_pincode"
          placeholder="Residence Pincode"
          label="Residence Pincode"
          value={data.residence_pincode}
          onChange={(e) => {
            if (/^\d{0,6}$/.test(e.target.value)) {
              handleDataChange("residence_pincode", e.target.value);
            }
          }}
          onBlur={() => handleBlur("residence_pincode")}
          isValid={!errors.residence_pincode}
          errorMessage={errors.residence_pincode}
        />

        {/* Residential Type Dropdown */}
        <FormSelect
          icon={
            <img
              src="/assets/icons/Icon C Type.png"
              className="h-6 px-2"
              alt="Residential Type"
            />
          }
          label="Residential Type"
          name="residential_type"
          value={data.residential_type}
          onChange={(value) => handleDataChange("residential_type", value)}
          options={residential_type_options}
          onBlur={() => handleBlur("residential_type")}
          isValid={!errors.residential_type}
          errorMessage={errors.residential_type}
        />

        <input type="hidden" name="utm_campaign" value="" />
        <input type="hidden" name="utm_source" value="" />
        <input type="hidden" name="utm_medium" value="" />
        <input type="hidden" name="utm_content" value="" />
        <input type="hidden" name="click_id" value="" />
        <input type="hidden" name="aff_id" value="" />
        <input type="hidden" name="src" value="" />

        {/* GST Section */}
        <GstRegistrationOption
          errorMessage={errors.gst_available}
          errors={errors}
          data={data}
          handleDataChange={handleDataChange}
          handleBlur={handleBlur}
        />
      </div>

      {/* Submit Button at the Bottom */}
      <FormButton
        className="w-full max-w-md bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg disabled:bg-gray-400"
        type="submit"
        onClick={handleSubmit}
        disabled={!isFormValid}
        id="myBtn"
      >
        Next
      </FormButton>
    </div>
  );
};

export default ApplyFormStep1;
