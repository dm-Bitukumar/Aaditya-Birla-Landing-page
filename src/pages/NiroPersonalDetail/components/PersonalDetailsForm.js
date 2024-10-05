import React, { useState, useEffect } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import Stepper from "../../../components/Form/Stepper";
import CustomCheckboxGroupNew from "./CustomCheckboxGroupNew";
import FormDobNiro from "../../../components/Form/FormDobNiro";
import FormInputNewNiro from "../../../components/Form/FormInputNewNiro";
import FormDobInput from "../../../components/Form/FormDobInput";
import FormSelect from "../../../components/Form/FormSelect";
import FormButton from "../../../components/Buttons/FormButton";
import ContinueBtn from "../../../components/Buttons/ContinueBtn";
import { useLocation } from "react-router";
import _ from "lodash";
import dayjs from "dayjs";
import { next } from "lodash/seq";
import moment, { localeData } from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setLead } from "../../../store/app/appReducer";
import { setUserClickData } from "../../../utility/setUserClickData";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const PersonalDetailsForm = ({ nextStep, lender }) => {
  const dispatch = useDispatch();

  const [inputType, setInputType] = useState("text");
  const [pancard, setPancard] = useState("");
  const [isPancardValid, setIsPancardValid] = useState(true);
  const [isDobValid, setIsDobValid] = useState(true);
  const [userName, setUserName] = useState("");
  const [isUserNameValid, setIsUserNameValid] = useState(true);

  const [data, setData] = useState({
    gender: "",
    dob: "",
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

  const handleUserNameChange = (event) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^A-Za-z" "]/g, "");
    setIsUserNameValid(true);
    setUserName(inputValue);
  };

  const handleValidate = () => {
    let isValid = true;
    setErrors("");
    const emailRegex = new RegExp(
      /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/
    );

    const { gender, email, pincode, dob, profession } = data;

    if (_.isEmpty(gender)) {
      isValid = false;
      setErrors("gender");
      setErrorMessage("Please select your gender");
    } else if (!moment(dob, "DD/MM/YYYY").isValid()) {
      isValid = false;
      setErrors("dob");
      setErrorMessage("Please enter valid DOB");
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
    if (lender !== "niro") {
      if (_.isEmpty(userName)) {
        isValid = false;
        setIsUserNameValid(false);
      }
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
        dob: moment(data.dob, "DD/MM/YYYY").format("YYYY-MM-DD"),
      };
      if (lender !== "niro") {
        localData.contact_name = userName;
      }
      dispatch(setLead({ ...localData, stepDone: 1 }));
    }
  };
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={"form-signin-apply "}>
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
      {lender !== "niro" ? (
        <FormInputNewNiro
          icon={
            <img
              src="/assets/icons/male.png"
              height="25"
              style={{ maxHeight: "25px" }}
              alt="icon 2.png"
            />
          }
          type="text"
          name="userName"
          isValid={isUserNameValid}
          id="userName"
          aria-describedby="name"
          placeholder="Full Name"
          value={userName}
          onChange={handleUserNameChange}
          required
          label={"Full Name"}
          errorMessage={"Please enter a valid user name"}
        />
      ) : null}
      <CustomCheckboxGroupNew
        isValid={errors !== "gender"}
        errorMessage={errorMessage}
        activeGender={data.gender}
        setActiveGender={(value) => handleDataChange("gender", value)}
      />
      <FormDobInput
        placeholder="dob"
        required
        id="dob"
        value={data.dob}
        onChange={(dob) => handleDataChange("dob", dob)}
        errorMessage={errorMessage}
        isValid={errors !== "dob"}
        icon={<img src="/assets/icons/dob.png" style={{ height: "25px" }} />}
        label={"Date Of Birth (DD | MM | YYYY)"}
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
        label={"PAN Card"}
        errorMessage={"Please enter a valid PAN number"}
      />
      <FormInputNewNiro
        type={"email"}
        placeholder="Personal Email ID"
        required
        id="email"
        value={data.email}
        onChange={(e) => handleDataChange("email", e.target.value)}
        errorMessage={errorMessage}
        isValid={errors !== "email"}
        icon={<img src="/assets/icons/email.png" style={{ height: "25px" }} />}
        label={"Personal Email ID"}
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
        placeholder="Home Pin Code"
        required
        id="pincode"
        value={data.pincode}
        onChange={(e) => handleDataChange("pincode", e.target.value)}
        errorMessage={errorMessage}
        isValid={errors !== "pincode"}
        icon={
          <img src="/assets/icons/pincode.png" style={{ height: "25px" }} />
        }
        label={"Home Pin Code"}
      />
      <div className="preApprovebutton" style={{ background: "#fff" }}>
        <ContinueBtn className="!py-4 !px-6" onClick={handleSubmit}>
          Continue
        </ContinueBtn>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
