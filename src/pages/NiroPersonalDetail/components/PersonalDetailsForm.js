import React, { useState } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import Stepper from "../../../components/Form/Stepper";
import CustomCheckboxGroupNew from "./CustomCheckboxGroupNew";
import FormInputNewNiro from "../../../components/Form/FormInputNewNiro";
import FormDob from "../../../components/Form/FormDob";
import FormSelect from "../../../components/Form/FormSelect";
import FormButton from "../../../components/Buttons/FormButton";
import _ from "lodash";
import dayjs from "dayjs";
import { next } from "lodash/seq";
import moment, { localeData } from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setLead } from "../../../store/app/appReducer";
import { setUserClickData } from "../../../utility/setUserClickData";

const PersonalDetailsForm = ({ nextStep }) => {
  const dispatch = useDispatch();
  const [inputType, setInputType] = useState("text");
  const [pancard, setPancard] = useState("");
  const [isPancardValid, setIsPancardValid] = useState(true);
  const [isDobValid, setIsDobValid] = useState(true);
  const [dob, setDob] = useState("");
  const [data, setData] = useState({
    gender: "",
    name: "",

    email: "",
    pincode: "",
    home_address1: "",
    home_address2: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState("");

  const handleDataChange = (key, value) => {
    setErrors("");
    setData((prevData) => ({ ...prevData, [key]: value }));
  };
  const handlePancardChange = (event) => {
    const { value } = event.target;
    setIsPancardValid(true);
    setPancard(value);
  };
  const handleFocus = () => {
    setInputType("date");
  };

  const handleBlur = (event) => {
    if (!event.target.value) {
      setInputType("text");
    }
  };
  const handleDobChange = (event) => {
    const { value } = event.target;

    setIsDobValid(true);
    setDob(value);
    setInputType("date");
  };
  console.log(dob);
  const handleValidate = () => {
    let isValid = true;
    setErrors("");
    const emailRegex = new RegExp(
      /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/
    );

    const { gender, name, email, pincode, profession } = data;

    if (_.isEmpty(gender)) {
      isValid = false;
      setErrors("gender");
      setErrorMessage("Please select your gender");
    } else if (_.isEmpty(name)) {
      isValid = false;
      setErrors("name");
      setErrorMessage("Please enter your name");
    } else if (_.isEmpty(dob)) {
      isValid = false;
      setIsDobValid(false);

      // } else if (!moment(dob, "DD/MM/YYYY").isValid()) {
      //   isValid = false;
      //   setErrors("dob");
      //   setErrorMessage("Please enter valid DOB");
    } else if (_.isEmpty(email)) {
      isValid = false;
      setErrors("email");
      setErrorMessage("Please enter your email");
    } else if (!emailRegex.test(email)) {
      isValid = false;
      setErrors("email");
      setErrorMessage("Please enter valid email");
    } else if (_.isEmpty(pincode)) {
      isValid = false;
      setErrors("pincode");
      setErrorMessage("Please enter your pincode");
    } else if (pincode.length !== 6) {
      isValid = false;
      setErrors("pincode");
      setErrorMessage("Please enter valid Indian pincode");
    }
    if (_.isEmpty(pancard)) {
      isValid = false;
      setIsPancardValid(false);
    }
    if (!/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/.test(pancard)) {
      isValid = false;
      setIsPancardValid(false);
    }

    return isValid;
  };

  const handleSubmit = () => {
    setUserClickData({
      event_name: "personal-detail-form-button",
    });
    const isValid = handleValidate();
    if (isValid) {
      nextStep();
      const localData = {
        ...data,
        pancard: pancard,
        dob: dob,
      };
      dispatch(setLead({ ...localData, stepDone: 1 }));
    }
  };
  console.log({
    ...data,
    pancard: pancard,
    dob: dob,
  });

  return (
    <div className={"form-signin-apply "} style={{ height: "100dvh" }}>
      <HeadBar />
      <Stepper
        steps={["Personal Details", "Work Details", "Offer Page"]}
        currentStep={0}
      />
      <h1
        className="mb-3 h3 fw-normal"
        style={{ fontSize: "20px", marginTop: "3em" }}
      >
        Personal Details
        {/* <strong>Upto 25 Lacs</strong> */}
      </h1>
      <CustomCheckboxGroupNew
        isValid={errors !== "gender"}
        errorMessage={errorMessage}
        activeGender={data.gender}
        setActiveGender={(value) => handleDataChange("gender", value)}
      />
      <FormInputNewNiro
        placeholder="Name"
        required
        id="name"
        value={data.name}
        onChange={(e) => handleDataChange("name", e.target.value)}
        errorMessage={errorMessage}
        isValid={errors !== "name"}
        icon={<img src="/assets/icons/male.png" style={{ height: "25px" }} />}
        label={"Full Name"}
      />
      <FormInputNewNiro
        icon={
          <img
            src="/assets/img/Icon 5.png"
            height="25"
            style={{ maxHeight: "25px" }}
            alt="icon 5.png"
          />
        }
        type={inputType}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name="dob"
        isValid={isDobValid}
        id="dob"
        aria-describedby="name"
        placeholder="Date Of Birth (DD| MM | YYYY)"
        value={dob}
        onChange={handleDobChange}
        required
        label={"Date Of Birth (DD| MM | YYYY)"}
        errorMessage={"Please enter a valid Dob"}
      />
      <FormInputNewNiro
        icon={
          <img
            src="/assets/icons/pancard.png"
            height="25"
            style={{ maxHeight: "25px" }}
            alt="PAN Card Icon"
          />
        }
        type="text"
        name="pancard"
        isValid={isPancardValid}
        id="pancard"
        aria-describedby="name"
        placeholder="PAN Card"
        minLength="10"
        maxLength="10"
        pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
        title="Please enter a valid PAN number. E.g. AAAAA9999A"
        value={pancard}
        onChange={handlePancardChange}
        required
        style={{ textTransform: "uppercase" }}
        label={"Pancard"}
        errorMessage={"Please enter a valid PAN number"}
      />
      <FormInputNewNiro
        type={"email"}
        placeholder="email"
        required
        id="email"
        value={data.email}
        onChange={(e) => handleDataChange("email", e.target.value)}
        errorMessage={errorMessage}
        isValid={errors !== "email"}
        icon={<img src="/assets/icons/email.png" style={{ height: "25px" }} />}
        label={"Email"}
      />
      <FormInputNewNiro
        type={"text"}
        placeholder="Home Address Line 1"
        required
        id="address1"
        value={data.home_address1}
        onChange={(e) => handleDataChange("home_address1", e.target.value)}
        errorMessage={errorMessage}
        isValid={errors !== "home_address1"}
        icon={
          <img src="/assets/icons/pincode.png" style={{ height: "25px" }} />
        }
        label={"Home Address Line 1"}
      />
      <FormInputNewNiro
        type={"text"}
        placeholder="Home Address Line 2"
        required
        id="addres2"
        value={data.home_address2}
        onChange={(e) => handleDataChange("home_address2", e.target.value)}
        errorMessage={errorMessage}
        isValid={errors !== "home_address2"}
        icon={
          <img src="/assets/icons/pincode.png" style={{ height: "25px" }} />
        }
        label={"Home Address Line 2"}
      />
      <FormInputNewNiro
        type={"number"}
        placeholder="Enter home pincode"
        required
        id="pincode"
        value={data.pincode}
        onChange={(e) => handleDataChange("pincode", e.target.value)}
        errorMessage={errorMessage}
        isValid={errors !== "pincode"}
        icon={
          <img src="/assets/icons/pincode.png" style={{ height: "25px" }} />
        }
        label={"Pincode"}
      />
      <div className="preApprovebutton">
        <FormButton onClick={handleSubmit}>Continue</FormButton>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
