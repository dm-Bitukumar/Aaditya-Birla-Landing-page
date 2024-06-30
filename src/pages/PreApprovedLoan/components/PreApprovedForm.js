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
import userOccupation from "../../../constants/occupation.json";
import OtpInputForm from "../../../components/Form/OtpInputForm";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login, setLead } from "../../../store/app/appReducer";
import OfferDetailsSegment from "./OfferDetailsSegment";
import CustomCheckboxGroup from "../../PersonalDetails/components/CustomCheckboxGroup";
import moment from "moment";
const arr = ["Salaried", "Self Employed", "Business Owner"];

const PreApprovedForm = ({ data }) => {
  const [isTncChecked, setIsTncChecked] = useState(true);
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");
  const [pancard, setPancard] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [userName, setUserName] = useState("");
  const [lender_id, setLenderId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [pincode, setPincode] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [isOccupationValid, setIsOccupationValid] = useState(true);
  const [isMonthlyIncomeValid, setIsMonthlyIncomeValid] = useState(true);
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [isPancardValid, setIsPancardValid] = useState(true);
  const [isCompanyNameValid, setIsCompanyNameValid] = useState(true);
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPincodeValid, setIsPincodeValid] = useState(true);
  const [isDobValid, setIsDobValid] = useState(true);
  const [userGender, setUserGender] = useState("");
  const [isGenderValid, setIsGenderValid] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setMobile(data?.contact_phone);
    setUserName(data?.contact_name);
    setLenderId(data?.lender_id);
  }, [data]);

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
    if (_.isEmpty(mobile)) {
      isValid = false;
      setIsMobileValid(false);
    }
    if (!/^\d{10}$/.test(mobile)) {
      isValid = false;
      setIsMobileValid(false);
    }
    if (_.isEmpty(email)) {
      isValid = false;
      setIsEmailValid(false);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isValid = false;
      setIsEmailValid(false);
    }
    if (_.isEmpty(pincode)) {
      isValid = false;
      setIsPincodeValid(false);
    }
    if (pincode.length !== 6) {
      isValid = false;
      setIsPincodeValid(false);
    }
    if (!moment(dob, "DD/MM/YYYY").isValid()) {
      isValid = false;
      setIsDobValid(false);
    }
    if (_.isEmpty(companyName)) {
      isValid = false;
      setIsCompanyNameValid(false);
    }
    if (_.isEmpty(userName)) {
      isValid = false;
      setIsUserNameValid(false);
    }
    if (_.isEmpty(monthlyIncome)) {
      isValid = false;
      setIsMonthlyIncomeValid(false);
    }
    if (_.isEmpty(occupation)) {
      isValid = false;
      setIsOccupationValid(false);
    }
    if (_.isEmpty(userGender)) {
      isValid = false;
      setIsGenderValid(false);
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
    setIsOccupationValid(true);
    setOccupation(event);
    console.log(event);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = handleValidation();
    if (isValid && isTncChecked) {
      const res = await callApi(
        "v1/sms/send-otp",
        "post",
        {
          contact_phone: mobile,
        },
        "messaging"
      );
      if (res["status"] === "Success") {
        dispatch(
          setLead({
            contact_phone: mobile,
            pancard,
            monthly_income: monthlyIncome,
            name: userName,
            company_name: companyName,
            salary_mode: "online/neft",
            pincode,
            lender_id,
            dob,
            email,
            profession: occupation,
            gender: userGender,
          })
        );
        setIsOtpGenerated(true);
      }
    }
  };

  const handleResendOtp = () => {
    // todo resend login with timer
  };

  const handleSubmitOtp = async () => {
    try {
      const res = await callApi(
        "v1/sms/validate-otp",
        "post",
        {
          contact_phone: mobile,
          otp,
        },
        "messaging"
      );

      if (res["status"] === "Success") {
        dispatch(login({ ...res.data.customer, token: res.data.token }));
        setShowOffers(true);
        setIsOtpGenerated(false);
      }
    } catch (err) {
      if (err.response.data.data.message === "Invalid OTP") {
        toast("Wrong OTP", { hideProgressBar: true, type: "error" });
      }
      console.log(err);
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
        {showOffers && <OfferDetailsSegment />}
        {!showOffers && isOtpGenerated && (
          <div style={{ marginTop: "180px" }}>
            <OtpInputForm
              buttonStyle={{ marginTop: "200px", marginBottom: "50px" }}
              otpValue={otp}
              setOtpValue={setOtp}
              handleResendOtp={handleResendOtp}
              phone_number={mobile}
              handleSubmitOtp={handleSubmitOtp}
            />
          </div>
        )}
        {!showOffers && !isOtpGenerated && (
          <>
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

              <CustomCheckboxGroup
                isValid={isGenderValid}
                errorMessage={"Please select a gender"}
                activeGender={userGender}
                setActiveGender={(value) => {
                  setUserGender(value);
                  setIsGenderValid(true);
                }}
              />
              <FormInput
                icon={
                  <img
                    src="assets/icons/male.png"
                    height="25"
                    alt="Phone Icon"
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
              <FormInput
                icon={
                  <img
                    src="assets/icons/dob.png"
                    height="25"
                    alt="Phone Icon"
                  />
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
                  <img
                    src="assets/icons/email.png"
                    height="25"
                    alt="Phone Icon"
                  />
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
          </>
        )}
      </div>
    </>
  );
};

export default PreApprovedForm;
