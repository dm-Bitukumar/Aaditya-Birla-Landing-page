import React from "react";
import FormButton from "../../../components/Buttons/FormButton";
import { convertNumberToIndianFormat } from "../../../utility/numberUtility";

const OfferTile = ({ offer, small }) => {
  const handleClick = () => {
    var win = window.open(offer.app_url, "_blank");
    win.focus();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`rounded-lg ring-1 ring-[#00c0ff] ${
          small ? "px-0 pb-2" : "px-16 pb-6"
        } text-center`}
      >
        <img src={offer.logo_image_url} />
        <h2
          className={`${
            small ? "text-xl" : "text-3xl"
          } font-semibold text-[#00c0ff]`}
        >
          ₹ {convertNumberToIndianFormat(offer.credit_limit ?? 0)}
        </h2>
        {!small && (
          <div>
            <h5 className="mt-6 text-xs font-semibold">
              Amount: ₹ {convertNumberToIndianFormat(offer.credit_limit ?? 0)}
            </h5>
            <h5 className="my-2 text-xs font-semibold">
              Tenure: {offer.tenure} Months
            </h5>
            <h5 className="text-xs font-semibold">
              EMI: ₹ {convertNumberToIndianFormat(offer.emi ?? 0)}
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
      {small && (
        <FormButton small={small} onClick={handleClick} className="!mt-2 !w-32">
          APPLY NOW
        </FormButton>
      )}
    </div>
  );
};

export default OfferTile;
