import React from "react";
import FormButton from "../../../components/Buttons/FormButton";
import { convertNumberToIndianFormat } from "../../../utility/numberUtility";

const OfferTile = ({ offer }) => {
  console.log(offer);

  const handleClick = () => {
    var win = window.open(offer.app_url, "_blank");
    win.focus();
  };

  return (
    <div className="rounded-lg ring-1 ring-[#00c0ff] px-16 py-6 text-center">
      <h2 className="text-3xl font-semibold text-[#00c0ff]">
        ₹ {convertNumberToIndianFormat(offer.credit_limit)}
      </h2>
      <h5 className="text-xs mt-6 font-semibold">
        Amount: ₹ {convertNumberToIndianFormat(offer.credit_limit)}
      </h5>
      <h5 className="text-xs my-2 font-semibold">
        Tenure: {offer.tenure} Months
      </h5>
      <h5 className="text-xs font-semibold">
        EMI: ₹ {convertNumberToIndianFormat(offer.emi)}
      </h5>
      <FormButton onClick={handleClick} className="!mt-2 !w-40">
        APPLY NOW
      </FormButton>
    </div>
  );
};

export default OfferTile;
