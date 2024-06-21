import HeadBar from "../../../components/Static/HeadBar";
import FormButton from "../../../components/Buttons/FormButton";
import FormInput from "../../../components/Form/FormInput";
import CheckboxTnC from "../../../components/Buttons/CheckboxTnC";
import { useEffect, useState } from "react";
import FormDob from "../../../components/Form/FormDob";
import FormSelect from "../../../components/Form/FormSelect";
import _ from "lodash";
import callApi from "../../../utility/apiCaller";
import RadioButton from "../../../components/Form/RadioButton/RadioButton";
import gender from "../../../constants/gender.json";
const arr = ["Salaried", "Self Employed", "Business Owner"];

const PreApprovedForm = ({ data }) => {
  const [isTncChecked, setIsTncChecked] = useState(true);
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [mobile, setMobile] = useState("");
  const [pancard, setPancard] = useState("");
  const [isOccupationValid, setIsOccupationValid] = useState(true);
  const [isMonthlyIncomeValid, setIsMonthlyIncomeValid] = useState(true);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [userName, setUserName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [pincode, setPincode] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [isPancardValid, setIsPancardValid] = useState(true);
  const [isCompanyNameValid, setIsCompanyNameValid] = useState(true);
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPincodeValid, setIsPincodeValid] = useState(true);
  const [isDobValid, setIsDobValid] = useState(true);
  const [userGender, setUserGender] = useState("");

  useEffect(() => {
    setMobile(data?.contact_phone);
    setUserName(data?.contact_name);
  }, [data]);
  const handleValidation = () => {
    let isValid = true;

    if (_.isEmpty(pancard)) {
      isValid = false;
      setIsPancardValid(false);
    } else {
      const isValidPancard = /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/.test(pancard);
      isValid = isValidPancard;
      setIsPancardValid(isValidPancard);
    }
    if (_.isEmpty(mobile)) {
      isValid = false;
      setIsMobileValid(false);
    } else {
      const isValidMobile = /^\d{10}$/.test(mobile);
      isValid = isValidMobile;
      setIsMobileValid(isValidMobile);
    }
    if (_.isEmpty(email)) {
      isValid = false;
      setIsEmailValid(false);
    } else {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      isValid = isValidEmail;
      setIsEmailValid(isValidEmail);
    }

    return isValid;
  };
  const handleMobileChange = (event) => {
    const { value } = event.target;
    setIsMobileValid(true);
    setMobile(value);
  };

  const handlePincodeChange = (event) => {
    const { value } = event.target;
    setIsPincodeValid(true);
    setPincode(value);
  };
  const handleDobChange = (event) => {
    const { value } = event.target;
    setIsDobValid(true);
    setDob(value);
  };
  const handleSelectChange = (event) => {
    const { value } = event.target;
    setIsOccupationValid(true);
    setOccupation(value);
  };
  const handlePancardChange = (event) => {
    const { value } = event.target;
    setIsPancardValid(true);
    setPancard(value);
  };
  const handleUserNameChange = (event) => {
    const { value } = event.target;
    setIsUserNameValid(true);
    setUserName(value);
  };
  const handleMonthlyChange = (event) => {
    const { value } = event.target;
    setIsMonthlyIncomeValid(true);
    setMonthlyIncome(value);
  };
  const handleCompanyChange = (event) => {
    const { value } = event.target;
    setIsCompanyNameValid(true);
    setCompanyName(value);
  };
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setIsEmailValid(true);
    setEmail(value);
  };
  const handleChange = () => {
    setIsTncChecked((prev) => !prev);
  };
  const userGenderHandler = (keyName, keyValue) => {
    console.log(keyValue);
    if (keyValue === gender[0]?.label) {
      setMale(keyValue);
    } else if (keyValue === gender[1]?.label) {
      setMale(keyValue);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = handleValidation();
    if (isValid) {
      const res = await callApi(
        "",
        "post",
        {
          contact_phone: mobile,
        },
        "messaging"
      );
      if (res["status"] === "Success") {
        setIsOtpGenerated(true);
      }
    }
  };
  return (
    <>
      <div
        className={"personal-loan-container"}
        style={{
          // border: "1px solid #e1e1e1",
          borderRadius: "5px",
          maxHeight: "100vh",
        }}
      >
        <HeadBar />
        <div className="flex items-center justify-center ">
          <img
            width={110}
            height={90}
            src="/assets/img/logo.png"
            alt=""
            style={{ marginTop: "0.7em" }}
          />
        </div>
        <div className={"personal-loan-form"} style={{ marginTop: "10px" }}>
          <FormInput
            icon={
              <img
                src="/assets/icons/phone-call.png"
                height="25"
                alt="Phone Icon"
              />
            }
            type="number"
            name="mobile"
            isValid={isMobileValid}
            id="mobile"
            aria-describedby="name"
            placeholder="Mobile"
            minLength="10"
            maxLength="10"
            pattern="[0-9]{10}"
            value={mobile}
            onChange={handleMobileChange}
            required
            label={"Mobile Number"}
            errorMessage={"Please enter a valid Mobile Number"}
          />
          <FormInput
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
          <div
            style={{
              display: "flex",
              marginBottom: "10px",
            }}
          >
            {gender?.map((item) => (
              <>
                <div
                  style={{
                    display: "flex",
                    height: "4em",
                    width: "50%",
                    border: "1px solid #d8dde2",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "40px", paddingLeft: "8px" }}>
                    <img src={item?.img} alt="" />
                  </div>
                  <RadioButton
                    checked={item?.label === userGender}
                    label={item?.label}
                    labelId={item?.label}
                    value={item?.value}
                    keyName={"gender"}
                    userGenderHandler={userGenderHandler}
                  />
                  {userGender === item.label ? (
                    <div style={{ width: "40px", paddingLeft: "8px" }}>
                      <img src="assets/img/Tick Mark.png" alt="" />
                    </div>
                  ) : null}
                </div>
              </>
            ))}
          </div>
          <FormInput
            icon={
              <img src="assets/icons/male.png" height="25" alt="Phone Icon" />
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
          <FormInput
            icon={
              <img src="assets/icons/dob.png" height="25" alt="Phone Icon" />
            }
            type="text"
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
          <FormSelect
            icon={
              <img
                src="assets/icons/profession.png"
                height="25"
                style={{ maxHeight: "25px" }}
                alt="PAN Card Icon"
              />
            }
            options={arr}
            isValid={isOccupationValid}
            value={occupation}
            onChange={handleSelectChange}
            label={"Occupation"}
            id="pan"
            required
            errorMessage={"Please select occupation"}
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
          <FormInput
            icon={
              <img
                src="assets/icons/turnover.png"
                height="25"
                alt="Phone Icon"
              />
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
              <img
                src="assets/icons/pincode.png"
                height="25"
                alt="Phone Icon"
              />
            }
            type="number"
            name="pincode"
            isValid={isPincodeValid}
            id="pincode"
            aria-describedby="name"
            placeholder="Pincode"
            minLength="10"
            maxLength="10"
            pattern="[0-9]{10}"
            value={pincode}
            onChange={handlePincodeChange}
            required
            label={"Pincode"}
            errorMessage={"Please enter a valid Pincode"}
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
          <CheckboxTnC checked={isTncChecked} handleChange={handleChange} />
          <FormButton
            style={{ marginTop: "30px" }}
            className="w-100 btn btn-lg btn-primary btn-get-otp"
            type="submit"
            onClick={handleSubmit}
            id="myBtn"
          >
            GET OTP
          </FormButton>
        </div>
        <div
          className="flex items-center justify-center"
          style={{
            margin: "1.25em",
          }}
        >
          <span
            style={{
              whiteSpace: "nowrap",
              fontSize: "0.8em",
              color: "#111",
            }}
          >
            Powered by
          </span>
          <img src={data?.logo_image_url} alt="img" />
        </div>
      </div>
    </>
  );
};

export default PreApprovedForm;
