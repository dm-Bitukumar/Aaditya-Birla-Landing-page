import React, { useEffect, useState } from "react";
import FormButton from "../../../components/Buttons/FormButton";
import { convertNumberToIndianFormat } from "../../../utility/numberUtility";
import { setUserClickData } from "../../../utility/setUserClickData";

const OfferTileNew = ({
  offer,
  small,
  setStep,
  mobileNumber,
  hideData,
  leadId,
}) => {
  const [show, setShow] = useState(false);
  const mobile = mobileNumber;

  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [show]);

  useEffect(() => {
    console.log("OfferTileNew Props:", {
      leadId: leadId,
      lender_id: offer?.lender_id,
      lender_name: offer?.lender_name,
      loan_amount: offer?.loan_amount,
      loan_tenure: offer?.loan_tenure,
      loan_emi: offer?.loan_emi,
      utm_medium: offer?.utm_medium,
      aff_id: offer?.aff_id,
      mobileNumber,
    });
  }, [offer, mobileNumber]);

  const handleClick = () => {
    let affId = offer?.aff_id || "";

    if (!affId) {
      const urlParams = new URLSearchParams(window.location.search);
      affId = urlParams.get("aff_id") || "";
    }

    setUserClickData({
      event_name: `preapp-offer-apply-button-lender-${
        offer?.lender_name || "unknown"
      }`,
      user_id: mobile || "unknown",
    });
    const utmMedium = offer?.utm_medium || "";
    const leadIdParam = leadId || "";
    console.log(utmMedium, affId, leadIdParam);
    if (offer?.lender_id === "66b76539fadd84ed521dcd2a") {
      const url = `https://oneapp.abfldirect.com/epl/index?dsa_hash=cbb1050eb01e3f56224da7c4b39a3eda1881bd93c474d2ccc23e0897281bd46a&utm_source=${affId}&utm_medium=sms&utm_campaign=&utm_term=${leadIdParam}&utm_content=`;
      console.log("Redirect URL:", url);
      window.location.href = url;
    } else if (offer?.lender_id === "6799b8fada60414f0f195bf9") {
      const redirectUrl = `https://instant-pocket-loan.poonawallafincorp.com/?redirectto=primepl&utm_DSA_Code=PMH00227&UTM_Partner_Name=DigitMoney&UTM_Partner_Medium=${utmMedium}&UTM_Partner_AgentCode=${affId}Pre&UTM_Partner_ReferenceID=${leadIdParam}`;
      console.log("Redirect URL:", redirectUrl);
      window.location.href = redirectUrl;
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
          {offer?.lender_id === "662752eb65fdba1a48d6e482"
            ? "Upto Rs. 10,00,000"
            : offer?.lender_id === "6799b8fada60414f0f195bf9"
            ? "Upto Rs. 15,00,000"
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
