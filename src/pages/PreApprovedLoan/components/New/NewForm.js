import React, { useState } from "react";
import FormInput from "../../../../components/Form/FormInputNew";
import CheckboxTnC from "../../../PersonalLoan/components/CheckboxTnC";
import FormButton from "../../../../components/Buttons/FormButton";
import { setUserClickData } from "../../../../utility/setUserClickData";
import callApi from "../../../../utility/apiCaller";
import userOccupation from "../../../../constants/occupation.json";
import FormSelect from "../../../../components/Form/FormSelectNew";
import _ from "lodash";
import "./css/new.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLead, setUserDetail } from "../../../../store/app/appReducer";

const NewForm = ({
  pages,
  data,
  setPages,
  phone,
  occupation,
  // setCompanyName,
  // setOccupation,
  // setMobile,
  // setMonthlyIncome,
  monthlyAmountInWords,
  setIsEmailValid,
  setIsMonthlyIncomeValid,
  setIsOccupationValid,
  setIsCompanyNameValid,
  isEmailValid,
  isOccupationValid,
  isCompanyNameValid,
  isMonthlyIncomeValid,
  monthlyIncome,
  email,
  companyName,
  handleCompanyChange,
  handleMonthlyChange,
  handleEmailChange,
  handleSelectChange,
}) => {
  // const [mobile, setMobile] = useState("");
  // const [pancard, setPancard] = useState("");
  // const [source, setSource] = useState("");
  // const [isPancardValid, setIsPancardValid] = useState(true);
  const [isTncChecked, setIsTncChecked] = useState(true);
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const dispatch = useDispatch();
  // const [isMobileValid, setIsMobileValid] = useState(true);
  const handleValidation1 = () => {
    let isValid = true;

    if (_.isEmpty(email)) {
      isValid = false;
      setIsEmailValid(false);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isValid = false;
      setIsEmailValid(false);
    }
    if (_.isEmpty(monthlyIncome)) {
      isValid = false;
      setIsMonthlyIncomeValid(false);
    }
    if (!(monthlyIncome.length >= 4)) {
      isValid = false;
      setIsMonthlyIncomeValid(false);
    }
    if (_.isEmpty(companyName)) {
      isValid = false;
      setIsCompanyNameValid(false);
    }
    if (_.isEmpty(occupation)) {
      isValid = false;
      setIsOccupationValid(false);
    }

    // if (!/^[a-zA-Z ]*$/.test(companyName)) {
    //   isValid = false;
    //   setIsCompanyNameValid(false);
    // }

    return isValid;
  };
  const handleChange = () => {
    setIsTncChecked((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    setUserClickData({ event_name: "otp-button-personal-loan-page" });
    if (!isTncChecked) {
      toast("Please accept terms and conditions", {
        hideProgressBar: true,
        type: "success",
      });
      return;
    }

    event.preventDefault();

    let isValid = handleValidation1();
    if (isValid) {
      setIsOtpGenerated(true);
      const res = await callApi(
        "v1/sms/send-otp",
        "post",
        {
          contact_phone: phone,
        },
        "messaging"
      );
      if (res["status"] === "Success") {
        setIsOtpGenerated(true);
        toast("OTP send successfully", {
          hideProgressBar: true,
          type: "success",
        });
        dispatch(
          setLead({
            ...data,
            email,
            profession: occupation,
            monthly_income: monthlyIncome.replace(/[^\d]/g, ""),
            company_type: companyName,
            salary_mode: "online/neft",
          })
        );
        setPages(pages + 1);
      }
    }
  };

  return (
    <div className=" bg-[#F4F8FF] h-screen">
      <center
        style={{
          marginTop: "2em",
        }}
      >
        <img src="/assets/img/logo.png" alt="" />
      </center>
      {/* <div className="mt-5">
        <h1 className="">Lets get stared</h1>
      </div> */}
      <div className="mt-10">
        <FormSelect
          icon={
            <img
              src="/assets/img/Icon 7.png"
              height="25"
              style={{ maxHeight: "25px" }}
              alt="Icon"
            />
          }
          options={userOccupation}
          isValid={isOccupationValid}
          value={occupation}
          onChange={handleSelectChange}
          label={"Occupation"}
          id="pan1"
          required
          errorMessage={"Please select occupation"}
        />
        <FormInput
          icon={
            <img src="/assets/img/Icon 9.png" height="25" alt="Phone Icon" />
          }
          type="text"
          name="monthlyIncome"
          isValid={isMonthlyIncomeValid}
          id="monthlyIncome"
          aria-describedby="name"
          placeholder="Monthly Income"
          minLength="4"
          // maxLength="10"
          // pattern="[0-9]{10}"
          value={monthlyIncome}
          onChange={handleMonthlyChange}
          required
          label={"Monthly Income"}
          errorMessage={"Please enter a valid Monthly Income"}
        />
        {monthlyAmountInWords ? (
          <p style={{ paddingBottom: "10px" }}>{monthlyAmountInWords}</p>
        ) : null}
        <FormInput
          icon={
            <img src="/assets/img/Icon 10.png" height="25" alt="Phone Icon" />
          }
          type="text"
          name="mobile"
          isValid={isEmailValid}
          id="mobile"
          aria-describedby="name"
          placeholder="Personal Email ID"
          value={email}
          onChange={handleEmailChange}
          required
          label={"Personal Email ID"}
          errorMessage={"Please enter a valid Email ID"}
        />
        <FormInput
          icon={
            <img src="/assets/img/Icon 8.png" height="25" alt="Phone Icon" />
          }
          type="text"
          name="companyName"
          isValid={isCompanyNameValid}
          id="companyName"
          aria-describedby="name"
          placeholder="Company Name"
          value={companyName}
          onChange={handleCompanyChange}
          required
          label={"Company Name"}
          errorMessage={"Please enter a valid company name"}
        />
      </div>
      <div className="stick_button">
        <span>
          <CheckboxTnC checked={isTncChecked} handleChange={handleChange} />
        </span>

        <div onClick={handleSubmit}>
          <FormButton style={{ marginTop: "1px" }}>Get OTP</FormButton>
        </div>
      </div>
    </div>
  );
};

export default NewForm;
