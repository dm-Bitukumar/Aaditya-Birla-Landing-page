import React, { useEffect, useState } from "react";
import FormButton from "../../../components/Buttons/FormButton";
import { convertNumberToIndianFormat } from "../../../utility/numberUtility";
import { setUserClickData } from "../../../utility/setUserClickData";

const OfferTileRedirect = ({ offer, small, redirectionLink }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [show]);

  const handleClick = () => {
    setUserClickData({ 
        event_name: "offer-apply-button-updated" 
    });

    if (offer?.app_url) {
      window.location.href = offer.app_url; 
    } else {
      console.error("Redirection link is missing."); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`rounded-lg ring-1 ring-[#00c0ff] ${
            small ? "px-0 pb-2" : "px-20 pb-6"
          } text-center`}
        >
        <img
          width={small ? 100 : 200}
          src={offer?.logo_image_url || "/assets/img/Dm LOGO.png"} 
          alt="Lender Logo"
          className="mt-4 mb-4"
        />
        <h2
          className={`${
            small ? "text-sm" : "text-3xl"
          } font-semibold text-[#00c0ff]`}
        >
          {convertNumberToIndianFormat(offer.credit_limit ?? 0)}
        </h2>
        {!small && (
            <div>
                <h5 className="mt-6 text-xs font-semibold">
                    Amount: {convertNumberToIndianFormat(offer.credit_limit ?? 0)}
                </h5>
                <h5 className="my-2 text-xs font-semibold">
                    Tenure: {offer.tenure} Months
                </h5>
                <h5 className="text-xs font-semibold">
                    EMI: {convertNumberToIndianFormat(offer?.emi ?? 0)}
                </h5>
                <h5 className="mt-2 text-xs font-semibold">
                    Interest: {offer?.interest ?? "N/A"}% 
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

export default OfferTileRedirect;
