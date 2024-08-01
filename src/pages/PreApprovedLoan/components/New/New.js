import React, { useState } from "react";
import CheckboxTnC from "../../../PersonalLoan/components/CheckboxTnC";
import CustomCheckboxGroup from "../../../PersonalDetails/components/CustomCheckboxGroup";
import FormButton from "../../../../components/Buttons/FormButton";
import FormSelect from "../../../../components/Form/FormSelect";
import FormInput from "../../../../components/Form/FormInput";
import MainFooter from "../../../Homepage/components/MainFooter";
import NewFooter from "./NewFooter";
import OtpInputForm from "../../../../components/Form/OtpInputForm";
import NewForm from "./NewForm";
import NewOtp from "./NewOtp";
import OffersPage from "../../../Offers/Offerspage";
import NewOffer from "./NewOffer";
import _ from "lodash";
import moment from "moment";
import callApi from "../../../../utility/apiCaller";
import { useDispatch } from "react-redux";
import { setUserDetail } from "../../../../store/app/appReducer";

const New = ({ pages, setPages }) => {
  const [errorMessage, setErrorMessage] = useState("");
  // const [pages, setPages] = useState(0);
  const dispatch = useDispatch();
  const [showPage, setShowPage] = useState(false);
  const [errors, setErrors] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");
  const [pancard, setPancard] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [occupation, setOccupation] = useState("");
  const [userName, setUserName] = useState("");
  const [lender_id, setLenderId] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [pincode, setPincode] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [isLoanAmountValid, setIsLoanAmountValid] = useState(true);
  const [isOccupationValid, setIsOccupationValid] = useState(true);
  const [isMonthlyIncomeValid, setIsMonthlyIncomeValid] = useState(true);
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [isPancardValid, setIsPancardValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isCompanyNameValid, setIsCompanyNameValid] = useState(true);
  const [isPincodeValid, setIsPincodeValid] = useState(true);
  const [isDobValid, setIsDobValid] = useState(true);
  const [userGender, setUserGender] = useState("");
  const [isGenderValid, setIsGenderValid] = useState(true);

  const [data, setData] = useState({
    contact_phone: "",
    pancard: "",

    name: "",

    amount_required: "",
    pincode: "",

    dob: "",

    gender: "",
  });
  const handleMonthlyChange = (event) => {
    const { value } = event.target;
    setIsMonthlyIncomeValid(true);
    setMonthlyIncome(value);
  };
  const handleCompanyChange = (event) => {
    const { value } = event.target;
    console.log(value);
    setIsCompanyNameValid(true);
    setCompanyName(value);
  };
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setIsEmailValid(true);
    setEmail(value);
  };
  const handleLoanAmountChange = (event) => {
    const { value } = event.target;
    setIsLoanAmountValid(true);
    setLoanAmount(value);
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

  // const { gender, name, dob, email, pincode, profession,phone } = data;
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

    if (_.isEmpty(userName)) {
      isValid = false;
      setIsUserNameValid(false);
    }

    if (_.isEmpty(userGender)) {
      isValid = false;
      setIsGenderValid(false);
    }
    if (_.isEmpty(loanAmount)) {
      isValid = false;
      setIsLoanAmountValid(false);
    }

    return isValid;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = handleValidation();
    if (isValid) {
      // const res = await callApi();
      // if (res["status"] === "Success") {
      // }

      setData({
        contact_phone: mobile,
        pancard: pancard,

        name: userName,

        amount_required: loanAmount,
        pincode: pincode,

        dob: moment(dob, "DD/MM/YYYY").format("YYYY-MM-DD"),

        gender: userGender,
      });

      setPages(pages + 1);
    }
  };
  // const handleDataChange = (key, value) => {
  //   setErrors("");
  //   setData((prevData) => ({ ...prevData, [key]: value }));
  // };
  return (
    <div>
      <div className="personal-loan-container bg-[#F4F8FF] ">
        {pages == 0 && (
          <div style={{ height: "100dhv" }}>
            <center>
              <img src="/assets/img/logo.png" alt="" />
            </center>
            <div className="mt-5">
              <h1 className="">Lets get started</h1>
            </div>
            <div className="mt-2">
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
                name="pancard"
                isValid={isLoanAmountValid}
                id="pancard"
                aria-describedby="name"
                placeholder="PAN Card"
                minLength="10"
                maxLength="10"
                pattern="[0-9]{10}"
                title="Please enter Loan Amount"
                value={loanAmount}
                onChange={handleLoanAmountChange}
                required
                style={{ textTransform: "uppercase" }}
                label={"Loan Amount Required"}
                errorMessage={"Please enter a valid Loan Amount"}
              />
            </div>
            <div className="bg-[#ffff]">
              <CustomCheckboxGroup
                isValid={isGenderValid}
                errorMessage={"Please select a gender"}
                activeGender={userGender}
                setActiveGender={(value) => {
                  setUserGender(value);
                  setIsGenderValid(true);
                }}
              />
            </div>
            <div>
              <FormInput
                icon={
                  <img
                    src="assets/icons/male.png"
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
              <FormInput
                icon={
                  <img
                    src="/assets/icons/phone-call.png"
                    height="25"
                    style={{ maxHeight: "25px" }}
                    alt="icon 4.png"
                  />
                }
                type="number"
                name="mobile"
                isValid={isMobileValid}
                id="phone"
                aria-describedby="name"
                placeholder="phone"
                minLength="10"
                maxLength="10"
                pattern="[0-9]{10}"
                title="Please enter a Valid mobile no."
                value={mobile}
                onChange={handleMobileChange}
                required
                style={{ textTransform: "uppercase" }}
                label={"Mobile Number"}
                errorMessage={"Please enter a valid Mobile Number"}
              />{" "}
              <FormInput
                icon={
                  <img
                    src="assets/icons/dob.png"
                    height="25"
                    style={{ maxHeight: "25px" }}
                    alt="icon 5.png"
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
              <FormInput
                icon={
                  <img
                    src="assets/icons/pincode.png"
                    height="25"
                    style={{ maxHeight: "25px" }}
                    alt="icon 6.png"
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
                    src="/assets/icons/pancard.png"
                    height="25"
                    style={{ maxHeight: "25px" }}
                    alt="PAN Card Icon"
                  />
                }
                type="text"
                name="PanCard"
                isValid={isPancardValid}
                id="PanCard"
                aria-describedby="name"
                placeholder="Pan Card"
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
            </div>

            <div style={{ marginTop: "16.625em" }}>
              <FormButton
                style={{ marginTop: "1px" }}
                className="w-100 btn btn-lg btn-primary btn-get-otp"
                type="submit"
                onClick={handleSubmit}
                id="myBtn"
              >
                Next
              </FormButton>
            </div>
          </div>
        )}

        {pages == 1 && (
          <NewForm
            pages={pages}
            setPages={setPages}
            phone={mobile}
            occupation={occupation}
            monthlyIncome={monthlyIncome}
            email={email}
            companyName={companyName}
            // setCompanyName={setCompanyName}
            // setOccupation={setOccupation}
            // setMobile={setMobile}
            // setMonthlyIncome={setMonthlyIncome}
            isOccupationValid={isOccupationValid}
            isEmailValid={isEmailValid}
            isMonthlyIncomeValid={isMonthlyIncomeValid}
            isCompanyNameValid={isCompanyNameValid}
            setIsCompanyNameValid={setIsCompanyNameValid}
            setIsMonthlyIncomeValid={setIsMonthlyIncomeValid}
            setIsEmailValid={setIsEmailValid}
            setIsOccupationValid={setIsCompanyNameValid}
            handleCompanyChange={handleCompanyChange}
            handleMonthlyChange={handleMonthlyChange}
            handleEmailChange={handleEmailChange}
            handleSelectChange={handleSelectChange}
            data={data}
          />
        )}

        {pages == 2 && (
          <NewOtp pages={pages} setPages={setPages} phone={mobile} />
        )}
        {pages == 3 && (
          <NewOffer showPage={showPage} setShowPage={setShowPage} />
        )}

        <h1 className="mt-10 font-bold text-center">Banking Partners</h1>

        <div className="flex gap-3 mt-2">
          <img src="/assets/img/Banking P 1.png" alt="" />

          <img src="/assets/img/Banking P 2.png" alt="" />
        </div>

        <div className="flex gap-3 mt-2">
          <img src="/assets/img/Banking P 3.png" alt="" />

          <img src="/assets/img/Banking P 4.png" alt="" />
        </div>
        <div className="flex gap-3 mt-2">
          <img src="/assets/img/Banking P 5.png" alt="" />

          <img src="/assets/img/Banking P 6.png" alt="" />
        </div>
        <div className="flex gap-3 mt-2">
          <img src="/assets/img/Banking P 7.png" alt="" />

          <img src="/assets/img/Banking P 8.png" alt="" />
        </div>
        <div className="flex gap-3 mt-2">
          <img src="/assets/img/Banking P 9.png" alt="" />

          <img src="/assets/img/Banking P 10.png" alt="" />
        </div>
        <div className="flex gap-3 mt-2">
          <img src="/assets/img/Banking P 11.png" alt="" />

          <img src="/assets/img/Banking P 12.png" alt="" />
        </div>

        <div className="w-full h-[1px] bg-slate-400 mt-4"></div>

        <div className="mt-4 ">
          <div className="flex gap-3">
            <div className="w-full h-32 rounded-lg bg-slate-50">
              <div className="px-4 mt-2">
                <img src="/assets/img/USP Icon 1.png" alt="" />
                <h1 className="mt-2 font-semibold">
                  instant <br /> approvats
                </h1>
              </div>
            </div>
            <div className="w-full h-32 rounded-lg bg-slate-50">
              <div className="px-4 mt-2">
                <img src="/assets/img/USP Icon 2.png" alt="" />
                <h1 className="mt-2 font-semibold">
                  Loan upto <br /> 25 Lacs
                </h1>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <div className="w-full h-32 rounded-lg bg-slate-50">
              <div className="px-4 mt-2">
                <img src="/assets/img/USP Icon 3.png" alt="" />
                <h1 className="mt-2 font-semibold">
                  Complete <br /> Digital Process
                </h1>
              </div>
            </div>
            <div className="w-full h-32 rounded-lg bg-slate-50">
              <div className="px-4 mt-2">
                <img src="/assets/img/USP Icon 4.png" alt="" />
                <h1 className="mt-2 font-semibold">
                  Quick <br /> Disbursal
                </h1>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <div className="w-full h-32 rounded-lg bg-slate-50">
              <div className="px-4 mt-2">
                <img src="/assets/img/USP Icon 5.png" alt="" />
                <h1 className="mt-2 font-semibold">
                  No <br /> Guaranters
                </h1>
              </div>
            </div>
            <div className="w-full h-32 rounded-lg bg-slate-50">
              <div className="px-4 mt-2">
                <img src="/assets/img/USP Icon 6.png" alt="" />
                <h1 className="mt-2 font-semibold">
                  Tenune upto <br /> 60 Months
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-slate-400 mt-4"></div>
        <h1 className="mt-5 font-semibold text-center">Disclaimer</h1>
        <p className="mt-2 text-center ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam
          voluptatum in sequi nihil quasi, nam at maxime nobis mollitia ex
          distinctio sapiente eligendi ullam labore modi sit dolor dolores
          fugiat.
        </p>
        <div className="w-full h-[1px] bg-slate-400 mt-5"></div>
        <div className="mt-2 text-center">
          <h1>Contact us</h1>
          <h1 className="mt-2"> hello@digitmoney.com</h1>
        </div>

        <NewFooter />
      </div>
    </div>
  );
};

export default New;
