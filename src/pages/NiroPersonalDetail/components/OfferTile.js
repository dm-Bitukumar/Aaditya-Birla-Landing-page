import React, { useEffect, useState } from "react";
import FormButton from "../../../components/Buttons/FormButton";
import { convertNumberToIndianFormat } from "../../../utility/numberUtility";
import { setUserClickData } from "../../../utility/setUserClickData";
import Model from "./OfferModel";
import NewOfferModel from "./NewOfferModel";

const OfferTile = ({ offer, small, source, i, lender }) => {
  const [show, setShow] = useState(false);
  const [offerLink, setOfferLink] = useState("");
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [show]);

  // Track lead event
  function trackFbqEvent(event) {
    if (window.fbq && window.fbq.callMethod) {
      window.fbq("track", event);
    } else {
      setTimeout(() => trackFbqEvent(event), 100);
    }
  }
  const handleContinueClick = () => {
    setShow(false);
    setUserClickData({ event_name: "offer-continue-button" });

    var win = window.open(`${offer.app_url}${source}`, "_blank");
    win.focus();
  };

  const handleClick = () => {
    if (lender === "niro") {
      trackFbqEvent("offer-apply-button");
    }

    if (offer.lender_name === "Prefr") {
      setShow(true);
      return;
    }
    if (offer.lender_name === "CashE") {
      setOfferLink(`${offer.app_url}${source}`);
      setShowModel(true);
      return;
    }

    setUserClickData({ event_name: "offer-apply-button" });
    setTimeout(() => {
      var win = window.open(`${offer.app_url}${source}`, "_blank");
      win.focus();
    }, 1000);
  };
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

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
              EMI: {convertNumberToIndianFormat(offer.emi ?? 0)}
            </h5>
          </div>
        )}
        {!small && (
          <FormButton
            small={small}
            onClick={handleClick}
            className="!mt-2 !w-40"
            id={"niro_appy_btn1"}
          >
            APPLY NOW
          </FormButton>
        )}
        <div>
          {show == true && (
            <Model
              show={show}
              handleClick={handleContinueClick}
              setShow={setShow}
              offer={offer}
            />
          )}
        </div>
      </div>
      {small && (
        <FormButton
          small={small}
          onClick={handleClick}
          className="!mt-2"
          id={`niro-btn-${i}`}
        >
          APPLY NOW
        </FormButton>
      )}
      {showModel && (
        <NewOfferModel
          show={showModel}
          setShow={setShowModel}
          offerLink={offerLink}
        />
      )}
    </div>
  );
};

export default OfferTile;
