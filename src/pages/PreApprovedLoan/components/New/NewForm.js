import React, { useState } from "react";
import FormInput from "../../../../components/Form/FormInput";
import CheckboxTnC from "../../../PersonalLoan/components/CheckboxTnC";
import FormButton from "../../../../components/Buttons/FormButton";
import { setUserClickData } from "../../../../utility/setUserClickData";
import callApi from "../../../../utility/apiCaller";
import _ from "lodash";
const NewForm = ({
  pages,
  setPages,
  phone,
  handleDataChange,
  occupation,
  MonthlyIncome,
  OfficialEmail,
  CompanyName,
}) => {
  const [mobile, setMobile] = useState("");
  const [pancard, setPancard] = useState("");
  const [source, setSource] = useState("");
  const [isPancardValid, setIsPancardValid] = useState(true);
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [isMobileValid, setIsMobileValid] = useState(true);
  const handleValidation = () => {
    let isValid = true;

    if (_.isEmpty(pancard)) {
      isValid = false;
      setIsPancardValid(false);
    }
    if (!/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/.test(pancard)) {
      isValid = false;
      setIsPancardValid(false);
    }
    if (_.isEmpty(phone)) {
      isValid = false;
      setIsMobileValid(false);
    }
    if (!/^\d{10}$/.test(phone)) {
      isValid = false;
      setIsMobileValid(false);
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    setUserClickData({ event_name: "otp-button-personal-loan-page" });

    event.preventDefault();
    let isValid = handleValidation();
    if (!isValid) {
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
        setPages(pages + 1);
      }
    }
    console.log("click");
  };

  return (
    <div className="personal-loan-container bg-[#F4F8FF] h-screen">
      <center>
        <img src="/assets/img/logo.png" alt="" />
      </center>
      {/* <div className="mt-5">
        <h1 className="">Lets get stared</h1>
      </div> */}
      <div className="mt-10">
        <FormInput
          icon={
            <img
              src="/assets/img/Icon 8.png"
              height="25"
              style={{ maxHeight: "25px" }}
              alt="PAN Card Icon"
            />
          }
          type="text"
          name="occupation"
          // isValid={isoccupationValid}
          id="occupation"
          aria-describedby="name"
          placeholder="occupation"
          // minLength="10"
          // maxLength="10"
          pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
          title="Please enter a valid PAN number. E.g. AAAAA9999A"
          // value={occupation}
          // onChange={(e) =>
          //   handleDataChange((e) => "occupation", e.target.value)
          // }
          required
          style={{ textTransform: "uppercase" }}
          label={"occupation"}
          // errorMessage={"Please enter a valid PAN number"}
        />
        <FormInput
          icon={
            <img
              src="/assets/img/Icon 9.png"
              height="25"
              style={{ maxHeight: "25px" }}
              alt="PAN Card Icon"
            />
          }
          type="text"
          name="Monthly Income"
          // isValid={isMonthely IncomeValid}
          id="Monthly Income"
          aria-describedby="name"
          placeholder="Monthly Income"
          // minLength="10"
          // maxLength="10"
          pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
          title="Please enter a valid PAN number. E.g. AAAAA9999A"
          // value={Monthely Income}
          // onChange={handleMonthely IncomeChange}
          required
          style={{ textTransform: "uppercase" }}
          label={"Monthly Income"}
          // errorMessage={"Please enter a valid PAN number"}
        />
        <FormInput
          icon={
            <img
              src="/assets/img/Icon 10.png"
              height="25"
              style={{ maxHeight: "25px" }}
              alt="PAN Card Icon"
            />
          }
          type="text"
          name="Official Email"
          // isValid={isOfficial EmailValid}
          id="Official Email"
          aria-describedby="name"
          placeholder="Official Email"
          // minLength="10"
          // maxLength="10"
          pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
          title="Please enter a valid PAN number. E.g. AAAAA9999A"
          // value={Official Email}
          // onChange={handleOfficial EmailChange}
          required
          style={{ textTransform: "uppercase" }}
          label={"Official Email"}
          // errorMessage={"Please enter a valid PAN number"}
        />
        <FormInput
          icon={
            <img
              src="/assets/img/Icon 1.png"
              height="25"
              style={{ maxHeight: "25px" }}
              alt="PAN Card Icon"
            />
          }
          type="text"
          name="company Name"
          // isValid={iscompany NameValid}
          id="company Name"
          aria-describedby="name"
          placeholder="company Name"
          // minLength="10"
          // maxLength="10"
          pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
          title="Please enter a valid PAN number. E.g. AAAAA9999A"
          // value={company Name}
          // onChange={handlecompany NameChange}
          required
          style={{ textTransform: "uppercase" }}
          label={"company Name"}
          // errorMessage={"Please enter a valid PAN number"}
        />
      </div>
      <div className="mt-28">
        <CheckboxTnC />
      </div>
      <div onClick={handleSubmit}>
        <FormButton style={{ marginTop: "1px" }}>Get OTP</FormButton>
      </div>
    </div>
  );
};

export default NewForm;
