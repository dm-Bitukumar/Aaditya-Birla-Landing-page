import React, { useEffect, useState } from "react";
// import HeadBar from "../../../components/Static/HeadBar";
// import Stepper from "../../../components/Form/Stepper";
import { useSelector } from "react-redux";
import _ from "lodash";
import { setUserClickData } from "../../utility/setUserClickData";

import OfferTile2 from "../PersonalDetails/components/OfferTileNew2";
import { getAllianceLeadFromMoneyTapInput } from "../../utility/commonUtils";
import { toast } from "react-toastify";

import { TRACK_ID } from "../../utility/enum";

import callApi from "../../utility/apiCaller";
import OfferTile from "../PersonalDetails/components/OfferTile";
import { useSearchParams } from "react-router-dom";
import FormButton from "../../components/Buttons/FormButtonNew";

const PreOffer = ({ PreData, source }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {/* <img src="/assets/img/Dm LOGO.png" /> */}

        <h3 className="mt-8 text-lg text-center">
          Congratulations{" "}
          <span className="text-2xl font-normal">
            {PreData?.contact_name}!!
          </span>{" "}
        </h3>
        <h3 className="text-lg">Your pre-approved offers </h3>

        <div
          className="px-6 py-2 mt-4 text-xs font-semibold rounded "
          style={{
            background: "#D9D9D9",
            color: "#000",
          }}
        >
          {/* RECOMMENDED */}
        </div>

        {PreData && (
          <div
            style={{
              marginTop: "0.7em",
              marginBottom: "1em",
            }}
          >
            <OfferTile small={false} offer={PreData} source={source} />
          </div>
        )}

        <p
          className="mt-3 mb-0 text-center"
          style={{
            fontSize: "10px",
          }}
        >
          Choose from these incredible offers that best suit your needs
        </p>
        {/* {offers.length > 4 && !show && (
            <div>
              <FormButton
                // small={small}
                onClick={handelShow}
                className="!mt-12 !w-40"
              >
                View more
              </FormButton>
            </div>
          )} */}
        <h4 className="mt-3 text-xs text-center">
          *These pre-approved offers are subject to change at discretion of Bank
          / NBFC after receiving all your documents and details. Final offer
          will be based on risk policy of Bank / NBFC. We do not guarantee that
          final offer will be same as Pre-approved offer.
        </h4>
      </div>
    </div>
  );
};

export default PreOffer;
