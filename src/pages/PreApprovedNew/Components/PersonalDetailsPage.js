import React, { useState, useEffect, useRef } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import Stepper from "../../../components/Form/Stepper";
import { setUserClickData } from "../../../utility/setUserClickData";
import moment from "moment";
import GenderBox from "./GenderBox";
import FormInput from "./FormInputBtn";
import FormDob from "./FormDobBtn";
import FormButton from "./FormBtnNew";
import { useSelector } from "react-redux";
import callApi from "../../../utility/apiCaller";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setPersonalDetails } from "../../../store/app/appReducer";

const PersonalDetailsForm = ({ setStep, handleDataChange, leadId }) => {
  const panDetails = useSelector((state) => state.app.panDetails);
  const { lenderName, lenderId } = useSelector((state) => state.app.lead);

  const [data, setData] = useState({
    firstName: panDetails.firstName || "",
    lastName: panDetails.lastName || "",
    gender: panDetails.gender || "",
    dob: panDetails.dob || "",
    email: "",
    address1: "",
    address2: "",
    pincode: "",
  });

  const [errors, setErrors] = React.useState({});
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      firstName: panDetails.firstName || "",
      lastName: panDetails.lastName || "",
      gender: panDetails.gender || "",
      dob: panDetails.dob || "", 
    }));
  }, [panDetails]);

  const handleChange = (key, value) => {
    setErrors((prev) => ({ ...prev, [key]: "" }));
    setData((prev) => ({ ...prev, [key]: value }));
    handleDataChange(key, value);
  };

  const validateInputs = () => {
    const validationErrors = {};
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!(data.firstName ?? "").trim()) {
      validationErrors.firstName = "Please enter your first name.";
    }
    if (!(data.lastName ?? "").trim()) {
      validationErrors.lastName = "Please enter your last name.";
    }
    if (!data.gender) {
      validationErrors.gender = "Please select your gender.";
    }
    if (!moment(data.dob, "DD/MM/YYYY", true).isValid()) {
      validationErrors.dob = "Please enter a valid Date of Birth.";
    }
    if (!data.email || !emailRegex.test(data.email)) {
      validationErrors.email = "Please enter a valid email.";
    }
    if (!(data.address1 ?? "").trim()) {
      validationErrors.address1 = "Address Line 1 is required.";
    }
    if (!data.pincode || data.pincode.length !== 6) {
      validationErrors.pincode = "Please enter a valid 6-digit PIN code.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async() => {
    setUserClickData({
      event_name: "personal-detail-form-button",
    });
    if (!leadId) {
      console.error("No lead ID provided.");
      return;
    }
    const id = "66d873e515025eb9a2a890ac"

    if (validateInputs()) {
      setIsLoading(true);

      try {
        dispatch(
          setPersonalDetails({
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            dob: moment(data.dob, "DD/MM/YYYY").format("YYYY-MM-DD"), 
            email: data.email,
            pincode: data.pincode,
          })
        );

        const response = await callApi(
          `v1/preapproved_lead/${leadId}/update`, 
          "post",
          {
            preapproved_lead: {
              gender: data.gender,
              dob: moment(data.dob, "DD/MM/YYYY").format("YYYY-MM-DD"), 
              email: data.email,
              pincode: data.pincode,
              address1: data.address1,
              address2: data.address2,
              is_personal_info_completed: true, 
            },
          },
          "core" 
        );
  
        if (response.status === "Success") {
          handleDataChange("personalDetails", data);
          toast.success("Personal details updated successfully.");
          setStep(5); 
        } else {
          console.error("Failed to update personal details:", response.message);
          toast.error("Failed to update personal details. Please try again.");
        }
      } catch (error) {
        console.error("Error while updating personal details:", error);
        toast.error("An error occurred while updating personal details.");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("Validation failed. Please correct the errors and try again."); 
    }
  };

  return (
    <div className="form-container">
      <HeadBar />
      <Stepper
        steps={["Personal Details", "Work Details", "Offer Page"]}
        currentStep={0}
      />

      <GenderBox
        isValid={!errors.gender}
        errorMessage={errors.gender}
        activeGender={data.gender}
        setActiveGender={(value) => handleChange("gender", value)}
      />

      <FormInput
        icon={
          <img 
            src="/assets/icons/male.png" 
            style={{ height: "25px" }}  
          />
        }
        type="text"
        name="firstName"
        isValid={!errors.firstName}
        value={data.firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
        placeholder="First Name"
        required
        label="First Name as per PAN Card"
        errorMessage={errors.firstName}
      />

      <FormInput
        icon={
          <img 
            src="/assets/icons/male.png" 
            style={{ height: "25px" }}  
          />
        }
        type="text"
        name="lastName"
        isValid={!errors.lastName}
        value={data.lastName}
        onChange={(e) => handleChange("lastName", e.target.value)}
        placeholder="Last Name"
        required
        label="Last Name as per PAN Card"
        errorMessage={errors.lastName}
      />

      <FormDob
        placeholder="DD | MM | YYYY"
        id="dob"
        value={data.dob}
        onChange={(dob) => handleChange("dob", dob)}
        errorMessage={errors.dob}
        isValid={!errors.dob}
        icon={
          <img 
            src="/assets/icons/dob.png" 
            style={{ height: "25px" }} 
          />
        }
        label="Date of Birth (DD | MM | YYYY)"
        required
      />

      <FormInput
        icon={
          <img 
            src="/assets/icons/email.png" 
            style={{ height: "25px" }} 
          />
        }
        required
        type="email"
        name="email"
        value={data.email}
        onChange={(e) => handleChange("email", e.target.value)}
        placeholder="Email ID"
        isValid={!errors.email}
        errorMessage={errors.email}
        label="Personal Email ID"
      />

      <FormInput
        icon={
          <img 
            src="/assets/icons/pincode.png" 
            style={{ height: "25px" }}  
          />
        }
        required
        type="text"
        name="address1"
        value={data.address1}
        onChange={(e) => handleChange("address1", e.target.value)}
        placeholder="Address Line 1"
        isValid={!errors.address1}
        errorMessage={errors.address1}
        label="Home Address Line 1"
      />

      <FormInput
        icon={
          <img 
            src="/assets/icons/pincode.png" 
            style={{ height: "25px" }} 
          />
        }
        type="text"
        name="address2"
        value={data.address2}
        onChange={(e) => handleChange("address2", e.target.value)}
        placeholder="Address Line 2"
        label="Home Address Line 2"
        isValid={true}
      />

      <FormInput
        icon={
          <img 
            src="/assets/icons/pincode.png" 
            style={{ height: "25px" }} 
          />
        }
        required
        type="number"
        name="pincode"
        value={data.pincode}
        onChange={(e) => handleChange("pincode", e.target.value)}
        placeholder="PIN Code"
        isValid={!errors.pincode}
        errorMessage={errors.pincode}
        label="Home PIN Code"
      />

      <FormButton 
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Continue"}
      </FormButton>
    </div>
  );
};

export default PersonalDetailsForm;
