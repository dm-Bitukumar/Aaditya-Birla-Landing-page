import React, { useEffect, useState } from "react";
import FormButton from "../../../components/Buttons/FormButton";
import { convertNumberToIndianFormat } from "../../../utility/numberUtility";
import { setUserClickData } from "../../../utility/setUserClickData";
const OfferTileNew = ({ offer, small, setStep, mobileNumber, hideData }) => {
  const [show, setShow] = useState(false);
  const mobile = mobileNumber;

  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [show]);

  const handleClick = () => {
    setUserClickData({
      event_name: `preapp-offer-apply-button-lender-${
        offer?.lender_name || "unknown"
      }`,
      user_id: mobile || "unknown",
    });
    if (offer?.lender_id === "66b76539fadd84ed521dcd2a") {
      window.location.href = "https://abfl.finbox.in/?partnerCode=AX_ME2SIV";
    } else {
      setStep(3);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`rounded-lg ring-1 ring-[#00c0ff] ${
          small ? "px-0 pb-2" : "px-20 pb-6"
        } text-center`}
      >
        <img width={small ? 100 : 200} src={offer?.logo_image_url} />
        <h2
          className={`${
            hideData
              ? `${
                  small ? "text-sm" : "text-xl"
                } font-semibold text-[#00c0ff] mt-4 mb-4`
              : `${small ? "text-sm" : "text-3xl"} font-semibold text-[#00c0ff]`
          }`}
          style={
            hideData
              ? {
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  display: "inline-block",
                }
              : {}
          }
        >
          {hideData
            ? "Upto Rs. 10,00,000"
            : convertNumberToIndianFormat(offer.loan_amount ?? 0)}
        </h2>
        {!small && !hideData && (
          <div>
            <h5 className="mt-6 text-xs font-semibold">
              Amount: {convertNumberToIndianFormat(offer.loan_amount ?? 0)}
            </h5>
            <h5 className="my-2 text-xs font-semibold">
              Tenure: {offer.loan_tenure} Months
            </h5>
            <h5 className="text-xs font-semibold">
              EMI: {convertNumberToIndianFormat(offer.loan_emi ?? 0)}
            </h5>
          </div>
        )}
        {!small && (
          <FormButton
            small={small}
            onClick={handleClick}
            className="!mt-2 !w-40"
          >
            APPLY NOW
          </FormButton>
        )}
      </div>
    </div>
  );
};

export default OfferTileNew;
