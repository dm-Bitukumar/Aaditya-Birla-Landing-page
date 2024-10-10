import React, { useEffect, useState } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import Stepper from "../../../components/Form/Stepper";
import FormButton from "../../../components/Buttons/FormButton";
import _ from "lodash";

import OfferTile from "./AdityaOfferTile";

const OfferDetailsSegment = ({ source, contactName, amount }) => {
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div
      className={"form-signin-apply "}
      style={{
        height: "100dvh",
        color: "GrayText",
      }}
    >
      <HeadBar />

      <div className="flex flex-col items-center justify-center">
        <img src="/assets/img/Dm LOGO.png" />

        <h3 className="mt-8 text-lg text-center">
          Congratulations{" "}
          <span className="text-2xl font-normal">
            {contactName?.split(" ")[0]}!!
          </span>{" "}
        </h3>
        <h3 className="text-lg">Your pre-approved offers </h3>
        {/* {of.length > 1 ? (
          <div className="px-10 py-1 mt-4 text-xs font-semibold bg-gray-300 rounded">
            RECOMMENDED
          </div> */}
        {/* ) : null */}
        <div className="my-4">
          <OfferTile
            small={false}
            amount={amount}
            source={source}
            contactName={contactName}
          />
        </div>
        <div
          className="mt-5 text-center"
          style={{
            fontSize: "14px",
          }}
        >
          Give us a call on our toll-free number
          <div>
            <b>1800-209-3997 </b>
            for any queries
          </div>
        </div>
        <h4 className="mt-20 text-xs text-center">
          *These pre-approved offers are subject to change at discretion of Bank
          / NBFC after receiving all your documents and details. Final offer
          will be based on risk policy of Bank / NBFC. We do not guarantee that
          final offer will be same as Pre-approved offer.
        </h4>
      </div>
    </div>
  );
};

export default OfferDetailsSegment;
