import { useState } from "react";
import _ from "lodash";
import FormButton from "../../../components/Buttons/FormButton";
import OtpInputForm from "../../../components/Form/OtpInputForm";
import { useNavigate } from "react-router";
import GstRegistrationOption from "./GstRegistrationOption";

const ApplyFormStep1 = ({ formData, setFormData, nextStep, ...props }) => {
  const [errors, setErrors] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({
    gst_available: "",
    gst_no: "",

    company_type: "",
    regd_proof: "",
  });

  const navigate = useNavigate();

  const handleValidation = () => {
    let isValid = true;
    setErrors("");
    const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/;

    if (data.gst_available === "") {
      isValid = false;
      setErrors("gst_available");
      setErrorMessage("Please select gst status");
    } else if (data.gst_available === "yes") {
      const { gst_no } = data;

      if (_.isEmpty(gst_no)) {
        isValid = false;
        setErrors("gst_no");
        setErrorMessage("Please enter GST Number");
      } else if (gstRegex.test(gst_no)) {
        isValid = false;
        setErrors("gst_no");
        setErrorMessage("Please enter valid GST Number");
      }
    } else if (data.gst_available === "no") {
      const { company_type, regd_proof } = data;

      if (_.isEmpty(company_type)) {
        isValid = false;
        setErrors("company_type");
        setErrorMessage("Please select Company Type");
      } else if (_.isEmpty(regd_proof)) {
        isValid = false;
        setErrors("regd_proof");
        setErrorMessage("Please select a Registration proof");
      }
    }

    return isValid;
  };

  const handleDataChange = (keyName, keyValue) => {
    let update = { ...data };
    update[keyName] = keyValue;
    setData(update);
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      nextStep();
    }
    // todo submit logic
  };

  return (
    <div className={"personal-loan-form"}>
      <img
        className="mt-3 mb-1 img logo-img"
        src="/assets/img/logo.png"
        alt=""
      />
      <img
        className="my-5 mb-3 img header-img"
        src="/assets/img/dm-bs.png"
        alt=""
      />
      <h1
        className="mt-5 text-center h3 fw-normal"
        style={{ fontSize: "20px", letterSpacing: "2pxs" }}
      >
        Lets Check Your
        <br />
        <strong>Eligibility Quicklyr</strong>
      </h1>
      <input type="hidden" name="utm_campaign" value="" />
      <input type="hidden" name="utm_source" value="" />
      <input type="hidden" name="utm_medium" value="" />
      <input type="hidden" name="utm_content" value="" />
      <input type="hidden" name="click_id" value="" />
      <input type="hidden" name="aff_id" value="" />
      <input type="hidden" name="src" value="" />
      <GstRegistrationOption
        errorMessage={errorMessage}
        errors={errors}
        data={data}
        handleDataChange={handleDataChange}
      />
      <FormButton
        style={{ marginTop: "10px" }}
        className="w-100 btn btn-lg btn-primary btn-get-otp"
        type="submit"
        onClick={handleSubmit}
        id="myBtn"
      >
        Continue
      </FormButton>
    </div>
  );
};

export default ApplyFormStep1;
