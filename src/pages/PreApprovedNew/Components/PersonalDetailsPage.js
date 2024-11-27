import React, { useState, useEffect } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import Stepper from "../../../components/Form/Stepper";
import FormDob from "../../../components/Form/FormDob";
import { useDispatch } from "react-redux";
import { setLead } from "../../../store/app/appReducer";
import { setUserClickData } from "../../../utility/setUserClickData";
import moment from "moment";
import GenderBox from "./GenderBox";
import FormInput from "../../../components/Form/FormInput";
import FormButton from "../../../components/Buttons/FormButton";

const PersonalDetailsForm = ({ setStep, setUserData, data: initialData = {} }) => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState(initialData.contact_name || "");
  const [data, setData] = useState({
    gender: initialData.gender || "",
    dob: initialData.dob || "",
    email: initialData.email || "",
    address1: initialData.address1 || "",
    address2: initialData.address2 || "",
    pincode: initialData.pincode || "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  const handleDataChange = (key, value) => {
    setErrors((prev) => ({ ...prev, [key]: "" })); 
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  const validateInputs = () => {
    const validationErrors = {};
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!userName.trim()) validationErrors.userName = "Please enter your full name.";
    if (!data.gender) validationErrors.gender = "Please select your gender.";
    if (!moment(data.dob, "DD/MM/YYYY", true).isValid())
      validationErrors.dob = "Please enter a valid Date of Birth.";
    if (!data.email || !emailRegex.test(data.email))
      validationErrors.email = "Please enter a valid email.";
    if (!data.address1.trim()) validationErrors.address1 = "Address Line 1 is required.";
    if (!data.pincode || data.pincode.length !== 6)
      validationErrors.pincode = "Please enter a valid 6-digit PIN code.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = () => {
    setUserClickData({ 
      event_name: "personal-detail-form-button" 
    });

    if (validateInputs()) {
      setIsLoading(true);
      const formattedData = {
        ...data,
        contact_name: userName,
        dob: moment(data.dob, "DD/MM/YYYY").format("YYYY-MM-DD"),
      };

      setUserData((prev) => ({
        ...prev,
        personalDetails: formattedData,
      }));
      console.log("Saved Personal Details:", formattedData);
      dispatch(setLead({ ...formattedData, stepDone: 1 }));
      setStep(5); 
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
        setActiveGender={(value) => handleDataChange("gender", value)}
      />

      <FormInput
        icon={
          <img 
            src="/assets/icons/male.png" 
            style={{ height: "25px" }}  
          />
        }
        type="text"
        name="userName"
        isValid={!errors.userName}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Full Name"
        required
        label="Full Name as per PAN Card"
        errorMessage={"Please enter a valid user name"}
      />

      <FormDob
        placeholder="DD | MM | YYYY"
        id="dob"
        value={data.dob}
        onChange={(dob) => handleDataChange("dob", dob)}
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
        onChange={(e) => handleDataChange("email", e.target.value)}
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
        onChange={(e) => handleDataChange("address1", e.target.value)}
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
        onChange={(e) => handleDataChange("address2", e.target.value)}
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
        onChange={(e) => handleDataChange("pincode", e.target.value)}
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
