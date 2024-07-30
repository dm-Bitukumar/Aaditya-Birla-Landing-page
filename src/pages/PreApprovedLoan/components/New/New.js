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

const New = ({ pages, setPages }) => {
  const [errorMessage, setErrorMessage] = useState("");
  // const [pages, setPages] = useState(0);
  const [errors, setErrors] = useState("");
  const [data, setData] = useState({
    gender: "",
    name: "",
    dob: "",
    email: "",
    pincode: "",
    profession: "",
    LoanAmountRequired: "",
    FullNameASPerCard: "",
    phone: "",
    PanCard: "",
    occupation: "",
    MonthlyIncome: "",
    OfficialEmail: "",
    CompanyName: "",
  });

  // const { gender, name, dob, email, pincode, profession,phone } = data;

  const handleDataChange = (key, value) => {
    setErrors("");
    setData((prevData) => ({ ...prevData, [key]: value }));
  };
  return (
    <>
      <div className="personal-loan-container bg-[#F4F8FF] ">
        {pages == 0 && (
          <div>
            <center>
              <img src="/assets/img/logo.png" alt="" />
            </center>
            <div className="mt-5">
              <h1 className="">Lets get stared</h1>
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
                name="LoanAmountRequired"
                // isValid={isLoanAmountRequiredValid}
                id="LoanAmountRequired"
                aria-describedby="name"
                placeholder="LoanAmountRequired"
                // minLength="10"
                // maxLength="10"
                pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
                title="Please enter a valid PAN number. E.g. AAAAA9999A"
                // value={LoanAmountRequired}
                onChange={(e) =>
                  handleDataChange("LoanAmountRequired", e.target.value)
                }
                style={{ textTransform: "uppercase" }}
                label={"LoanAmountRequired"}
                // errorMessage={"Please enter a valid PAN number"}
                required
              />
            </div>
            <div className="bg-[#ffff]">
              <CustomCheckboxGroup
                // isValid={errors !== "gender"}
                errorMessage={errorMessage}
                activeGender={data.gender}
                setActiveGender={(value) => handleDataChange("gender", value)}
              />
            </div>
            <div>
              <FormInput
                icon={
                  <img
                    src="/assets/img/icon 2.png"
                    height="25"
                    style={{ maxHeight: "25px" }}
                    alt="icon 2.png"
                  />
                }
                type="text"
                name="FullNameASPerCard"
                // isValid={isFullNameASPerCardValid}
                id="FullNameASPerCard"
                aria-describedby="name"
                placeholder="FullNameASPerCard"
                // minLength="10"
                // maxLength="10"
                pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
                title="Please enter a valid PAN number. E.g. AAAAA9999A"
                // value={FullNameASPerCard}

                onChange={(e) =>
                  handleDataChange("FullNameASPerCard", e.target.value)
                }
                required
                style={{ textTransform: "uppercase" }}
                label={"FullNameASPerCard"}
                // errorMessage={"Please enter a valid PAN number"}
              />
              <FormInput
                icon={
                  <img
                    src="/assets/img/icon 4.png"
                    height="25"
                    style={{ maxHeight: "25px" }}
                    alt="icon 4.png"
                  />
                }
                type="number"
                name="phone"
                // isValid={isphoneValid}
                id="phone"
                aria-describedby="name"
                placeholder="phone"
                // minLength="10"
                // maxLength="10"
                pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
                title="Please enter a valid PAN number. E.g. AAAAA9999A"
                // value={phone}
                onChange={(e) => handleDataChange("phone", e.target.value)}
                required
                style={{ textTransform: "uppercase" }}
                label={"phone"}
                // errorMessage={"Please enter a valid PAN number"}
              />{" "}
              <FormInput
                icon={
                  <img
                    src="/assets/img/icon 5.png"
                    height="25"
                    style={{ maxHeight: "25px" }}
                    alt="icon 5.png"
                  />
                }
                type="text"
                name="dob"
                // isValid={isdobValid}
                id="dob"
                aria-describedby="name"
                placeholder="dob"
                // minLength="10"
                // maxLength="10"
                pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
                title="Please enter a valid PAN number. E.g. AAAAA9999A"
                // value={dob}
                // onChange={handledobChange}
                required
                style={{ textTransform: "uppercase" }}
                label={"dob"}
                // errorMessage={"Please enter a valid PAN number"}
              />
              <FormInput
                icon={
                  <img
                    src="/assets/img/icon 6.png"
                    height="25"
                    style={{ maxHeight: "25px" }}
                    alt="icon 6.png"
                  />
                }
                type="number"
                name="pincode"
                // isValid={ispincodeValid}
                id="pincode"
                aria-describedby="name"
                placeholder="pincode"
                // minLength="10"
                // maxLength="10"
                pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
                title="Please enter a valid PAN number. E.g. AAAAA9999A"
                // value={pincode}
                onChange={(e) => handleDataChange("pincode", e.target.value)}
                required
                style={{ textTransform: "uppercase" }}
                label={"pincode"}
                // errorMessage={"Please enter a valid PAN number"}
              />
              <FormInput
                icon={
                  <img
                    src="/assets/img/icon 7.png"
                    height="25"
                    style={{ maxHeight: "25px" }}
                    alt="PAN Card Icon"
                  />
                }
                type="text"
                name="PanCard"
                // isValid={isPanCardValid}
                id="PanCard"
                aria-describedby="name"
                placeholder="PanCard"
                // minLength="10"
                // maxLength="10"
                pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
                title="Please enter a valid PAN number. E.g. AAAAA9999A"
                // value={PanCard}
                onChange={(e) => handleDataChange("PanCard".e.target.value)}
                required
                style={{ textTransform: "uppercase" }}
                label={"PanCard"}
                // errorMessage={"Please enter a valid PAN number"}
              />
            </div>
            <div className="mt-28">
              <CheckboxTnC />
            </div>
            <div onClick={() => setPages(pages + 1)}>
              <FormButton style={{ marginTop: "1px" }}>Next</FormButton>
            </div>
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

          </div>
        )}
        {pages == 1 && (
          <NewForm
            pages={pages}
            setPages={setPages}
            phone={data.phone}
            occupation={data.occupation}
            MonthlyIncome={data.MonthlyIncome}
            OfficialEmail={data.OfficialEmail}
            CompanyName={data.CompanyName}
            handleDataChange={data.handleDataChange}
          />
        )}

        {pages == 2 && <NewOtp pages={pages} setPages={setPages} />}
        {pages == 3 && <NewOffer />}
        <NewFooter />
      </div>
    </>
  );
};

export default New;
