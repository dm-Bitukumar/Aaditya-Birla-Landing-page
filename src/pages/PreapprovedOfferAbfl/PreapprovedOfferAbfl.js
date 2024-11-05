import React, { useEffect, useState } from "react";
import HeadBar from "../../components/Static/HeadBar";
import Stepper from "../../components/Form/Stepper";
import FormButton from "../../components/Buttons/FormButton";
import _ from "lodash";
import { setUserClickData } from "../../utility/setUserClickData";
import callApi from "../../utility/apiCaller";
import { useSearchParams } from "react-router-dom";
import OfferTile from "./offerTile";

const OfferDetailsSegment = ({ source, contactName, amount }) => {
  const [params] = useSearchParams();
  const [offers, setOffers] = useState();
  const [show, setShow] = useState(false);
  const [lead, setLead] = useState();

  useEffect(() => {
    if (params.get("phone")) fetchOffers(params.get("phone"));
  }, [params]);

  const fetchOffers = async (phone) => {
    try {
      const res = await callApi(
        "v1/preapproved_lead/abfl-pa-remarketing",
        "post",
        {
          contact_phone: phone,
          //   kyc_consent: isTncChecked,
          //   utm_medium: sourceConvert(utmSource),
          //   aff_id: affId,
        },
        "core"
      );

      if (res.status === "Success") {
        if (res?.data?.offers?.status === true) {
          //   setUserClickData({
          //     event_name: "abfl-lp-offer",
          //   });
          let localOffers = res.data.offers;

          setOffers(localOffers);
        } else {
          setShow(!show);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      {!offers && (
        <div className="mb-4 font-normal text-center">
          Please wait while we are searching best offers for you
          <span class="ml-2 dot-pulse"></span>
        </div>
      )}
      {show && (
        <div className="mb-4 font-normal text-center">
          There is no offer for you currently.
        </div>
      )}
      {offers && offers.contact_name && (
        <div className="flex flex-col items-center justify-center">
          <img src="/assets/img/Dm LOGO.png" />

          <h3 className="mt-8 text-lg text-center">
            Congratulations{" "}
            <span className="text-2xl font-normal">
              {offers?.contact_name?.split(" ")[0]}!!
            </span>{" "}
          </h3>
          <h3 className="text-lg">Your pre-approved Loan Amount </h3>
          {/* {of.length > 1 ? (
          <div className="px-10 py-1 mt-4 text-xs font-semibold bg-gray-300 rounded">
            RECOMMENDED
          </div> */}
          {/* ) : null */}
          <div className="my-4">
            <OfferTile
              small={false}
              amount={offers?.credit_limit}
              source={offers?.app_url}
              contactName={offers?.contact_name}
            />
          </div>
          {/* <div
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
        </div> */}
          <h4 className="mt-20 text-xs text-center">
            *These pre-approved offers are subject to change at discretion of
            Bank / NBFC after receiving all your documents and details. Final
            offer will be based on risk policy of Bank / NBFC. We do not
            guarantee that final offer will be same as Pre-approved offer.
          </h4>
        </div>
      )}
    </div>
  );
};

export default OfferDetailsSegment;
