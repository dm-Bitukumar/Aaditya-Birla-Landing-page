import React, { Fragment, useState } from "react";
// import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import FormButton from "../../../components/Buttons/FormButton";
import FormInput from "../../../components/Form/FormInput";
import numberToWords from "../../../utility/numberToWords";
import { convertNumberToIndianFormat } from "../../../utility/numberUtility";
import { setUserClickData } from "../../../utility/setUserClickData";
import callApi from "../../../utility/apiCaller";
import { toast } from "react-toastify";

const Model = ({
  show,
  setShow,
  offer,
  handleClick,
  handleChange,
  isTncChecked,
}) => {
  const [monthlySalary, setMonthlySalary] = useState("");
  const [salaryInWords, setSalaryInWords] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchIpAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (err) {
      return "";
    }
  };

  const handleMonthlyIncome = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    setMonthlySalary(value ? convertNumberToIndianFormat(value) : "");

    if (value) {
      const words = numberToWords(Number(value));
      setSalaryInWords(words.trim());
      setErrors("");
      setErrorMessage("");
    } else {
      setSalaryInWords("");
    }
  };

  const validateInput = () => {
    if (!monthlySalary || Number(monthlySalary.replace(/[^0-9]/g, "")) === 0) {
      setErrors("monthly_income");
      setErrorMessage("Please enter your Monthly Income");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateInput()) {
      setIsProcessing(true);

      try {
        const ipAddress = await fetchIpAddress();
        const payload = {
          prefr_monthly_income: monthlySalary.replace(/[^0-9]/g, ""),
          lead_id: offer.lead_id,
          prefr_ip_address: ipAddress,
          prefr_kyc_consent: isTncChecked,
        };

        const response = await callApi(
          "v1/lead/prefr-redirection-link",
          "post",
          payload,
          "core"
        );

        if (response.status === "Success") {
          setUserClickData({
            event_name: `redirection-link-fetched-successfully`,
          });
          const redirectionUrl = response.data.result;
          window.location.href = redirectionUrl;
        } else {
          console.error(
            "API Error:",
            response.message || "Unknown error occurred."
          );
          toast.error(
            response.message || "Failed to fetch the redirection link."
          );
          setIsProcessing(false);
        }
      } catch (error) {
        console.error("Error in API call:", error);
        toast.error("Something went wrong. Please try again.");
        setIsProcessing(false);
      }
    }
  };

  return (
    <>
      <Transition.Root show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setShow(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              // onClick={() => console.log(false)}
              className="fixed inset-0 transition-opacity bg-black bg-opacity-40"
            />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto top-12">
            <div className="flex items-end justify-center p-4 mins-h-full sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="w-full transition-all transform rounded-lg shadow-xl md:my-8 md:max-w-xl">
                  <div className="w-full h-full px-4 py-3 rounded bg-[#fff]">
                    <div className="mb-4">
                      <FormInput
                        type="text"
                        placeholder="Enter your salary"
                        value={monthlySalary}
                        onChange={handleMonthlyIncome}
                        errorMessage={errorMessage}
                        isValid={errors !== "monthly_income"}
                        icon={
                          <img
                            src="/assets/icons/income.png"
                            style={{ height: "25px" }}
                          />
                        }
                        label="Monthly Income"
                      />
                      {salaryInWords && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{salaryInWords}</span>
                        </p>
                      )}
                    </div>
                    <p className="mb-2">
                      To process your personal loan application today, we
                      required verification of your credit information Click "I
                      agree" to speed up the loan process and receive Funds
                      today.
                    </p>
                    <label>
                      <input
                        onChange={handleChange}
                        checked={isTncChecked}
                        className="form-check-input"
                        type="checkbox"
                        name="is_consent"
                        value="Yes"
                        style={{ fontSize: "15px", marginRight: "4px" }}
                      />
                      I hereby appoint Prefr & its Lending Partners as
                      authorized representatives to receive my credit
                      information from CIBIL/CRIF Highmark(bureau).
                    </label>
                    <div className="flex items-center justify-center">
                      <FormButton
                        className={"!w-24"}
                        small
                        onClick={handleSubmit}
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processing..." : "I agree"}
                      </FormButton>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Model;
