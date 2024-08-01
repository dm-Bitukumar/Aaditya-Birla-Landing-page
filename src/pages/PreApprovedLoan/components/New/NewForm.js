import React, { useState } from "react";
import FormInput from "../../../../components/Form/FormInput";
import CheckboxTnC from "../../../PersonalLoan/components/CheckboxTnC";
import FormButton from "../../../../components/Buttons/FormButton";
import { setUserClickData } from "../../../../utility/setUserClickData";
import callApi from "../../../../utility/apiCaller";
import userOccupation from "../../../../constants/occupation.json";
import FormSelect from "../../../../components/Form/FormSelect";
import _ from "lodash";
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
  const handleValidation = () => {
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
    if (_.isEmpty(occupation)) {
      isValid = false;
      setIsOccupationValid(false);
    }
    if (_.isEmpty(companyName)) {
      isValid = false;
      setIsCompanyNameValid(false);
    }

    return isValid;
  };
  const handleChange = () => {
    setIsTncChecked((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    setUserClickData({ event_name: "otp-button-personal-loan-page" });
    if (!isTncChecked) return;

    event.preventDefault();

    let isValid = handleValidation();
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
            monthly_income: monthlyIncome,
            company_type: companyName,
            salary_mode: "online/neft",
          })
        );
        setPages(pages + 1);
      }
    }
    console.log("click");
  };

  return (
    <div className=" bg-[#F4F8FF] h-screen">
      <center>
        <img src="/assets/img/logo.png" alt="" />
      </center>
      {/* <div className="mt-5">
        <h1 className="">Lets get stared</h1>
      </div> */}
      <div className="mt-10">
        <FormSelect
          icon={
            <img
              src="assets/icons/profession.png"
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
            <img src="assets/icons/turnover.png" height="25" alt="Phone Icon" />
          }
          type="number"
          name="monthlyIncome"
          isValid={isMonthlyIncomeValid}
          id="monthlyIncome"
          aria-describedby="name"
          placeholder="Monthly Income"
          minLength="10"
          maxLength="10"
          pattern="[0-9]{10}"
          value={monthlyIncome}
          onChange={handleMonthlyChange}
          required
          label={"Monthly Income"}
          errorMessage={"Please enter a valid Monthly Income"}
        />
        <FormInput
          icon={
            <img src="assets/icons/email.png" height="25" alt="Phone Icon" />
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
            <img
              src="/assets/icons/Icon C Name.png"
              height="25"
              alt="Phone Icon"
            />
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
      <div style={{ marginTop: "calc(100vh - 62vh)" }}>
        <div>
          <CheckboxTnC checked={isTncChecked} handleChange={handleChange} />
        </div>
        <div onClick={handleSubmit}>
          <FormButton style={{ marginTop: "1px" }}>Get OTP</FormButton>
        </div>
      </div>
    </div>
  );
};

export default NewForm;
