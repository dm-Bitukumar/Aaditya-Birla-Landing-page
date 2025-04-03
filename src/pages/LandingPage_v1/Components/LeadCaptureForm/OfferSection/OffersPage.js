import React, { useEffect, useState } from "react";
import "./OffersPage.css";
import { useSelector, useDispatch } from "react-redux";
import { setOffers } from "../../../../../store/app/appReducer";
import callApi from "../../../../../utility/apiCaller";
import { toast } from "react-toastify";
import {
  getAllianceLeadFromMoneyTapInput,
  sourceConvert,
} from "../../../../../utility/commonUtils";
import { setUserClickData } from "../../../../../utility/setUserClickData";
import OfferCard from "./OfferCard";
import { TRACK_ID } from "../../../../../utility/enum";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";

const OfferPage = ({ formData, setFormData, setCurrentStep }) => {
  const lead = useSelector((state) => state.app.lead);
  const user = useSelector((state) => state.app.user);
  const offers = useSelector((state) => state.app.offers);
  const dispatch = useDispatch();
  const [isFinished, setIsFinished] = useState(false);
  const [leadId, setLeadId] = useState();
  const [expandedOfferId, setExpandedOfferId] = useState(null);
  const [params] = useSearchParams();

  useEffect(() => {
    if (formData.stepDone === 3 && !leadId) {
      submitLead();
    }
  }, [formData]);

  useEffect(() => {
    if (offers.length > 0 && !expandedOfferId) {
      setExpandedOfferId(offers[0]._id);
    }
  }, [offers]);

  const submitLead = async () => {
    setUserClickData({
      event_name: "personal-detail-api-v2-for-pl-pan",
      user_id: formData.mobile || "No User ID found here",
      affiliate_id: params.get("aff_id") || "No Aff_id found",
    });
    try {
      const trackId = localStorage.getItem(TRACK_ID);
      const processedLead = getAllianceLeadFromMoneyTapInput("website-pl-pan", {
        ...formData,
        ...user,
      });
      console.log("Processed Lead: ", processedLead);
      const res = await callApi(
        "v1/lead/finbud-lp-lead",
        "post",
        {
          lead: {
            ...processedLead,
            tracking_id: trackId,
            aff_id: params.get("aff_id"),
            utm_source: params.get("utm_source"),
            source: params.get("source"),
            utm_medium: params.get("utm_medium"),
          },
        },
        "core",
        user.token
      );
      if (res.status === "Success" && res.data.lead) {
        const newLeadId = res.data.lead._id;
        const contactPhone = res.data.lead.contact_phone;
        setLeadId(newLeadId);

        const processLeadRes = await callApi(
          "v1/lead/process-lead-for-loan-v2",
          "post",
          { contact_phone: contactPhone },
          "core",
          user.token
        );
        if (processLeadRes.status === "Success") {
          setUserClickData({
            event_name: "process-lead-for-loan-personal-loan-v2-for-pl-pan",
            user_id: contactPhone || leadId || "No User ID found here",
            affiliate_id: params.get("aff_id") || "No Aff_id found",
          });
          // fetchOffers(newLeadId);
          let attempt = 0;
          const maxAttempts = 6;
          const interval = setInterval(async () => {
            attempt++;
            const offerFound = await fetchOffers(newLeadId);
            if (offerFound || attempt === maxAttempts) {
              clearInterval(interval);
              if (!offerFound) setIsFinished(true);
            }
          }, 5000);

          const firstResult = await fetchOffers(newLeadId);
          if (firstResult) clearInterval(interval);
        }
      }
    } catch (err) {
      toast("Some error occurred", { hideProgressBar: true, type: "error" });
      console.log(err);
    }
  };

  const fetchOffers = async (leadId) => {
    if (!leadId || isFinished) return false;

    try {
      const loanOfferRes = await callApi(
        `v1/loan_offer/lead_id/${leadId}`,
        "get",
        {},
        "core",
        user.token
      );

      if (
        loanOfferRes.status === "Success" &&
        loanOfferRes.data?.offers?.length > 0
      ) {
        console.log(loanOfferRes);
        const priorityRes = await callApi(
          `v1/finbud_data/finbud_update_priority/${leadId}`,
          "post",
          loanOfferRes,
          "loan",
          user.token
        );

        if (
          priorityRes.status === "Success" &&
          Array.isArray(priorityRes.data?.offers)
        ) {
          const sortedOffers = _.orderBy(
            priorityRes.data.offers,
            ["priority"],
            ["asc"]
          );
          dispatch(setOffers(sortedOffers));

          if (priorityRes.data.lead?.all_responses) {
            setIsFinished(
              priorityRes.data.lead.all_responses ===
                priorityRes.data.lead.total_response
            );
          } else {
            setIsFinished(true);
          }
          return true;
        }
      }
      return false;
    } catch (err) {
      console.error("Error in offer fetching", err);
      toast.error("Something went wrong while fetching offers.");
      setIsFinished(true);
      return false;
    }
  };

  return (
    <div id="offer-page-v3">
      {offers.length > 0 ? (
        <>
          <div className="final-offers-container">
            <div className="offer-bg-layer" />
            <h2 className="congrats-text">Congratulations!</h2>
            <h3 className="sub-text-v1">You’re Pre-Approved for</h3>
            <h3 className="sub-text-v1">a Personal Loan!</h3>
          </div>
          <div className="offer-cards-container">
            {offers.map((offer) => (
              <OfferCard
                key={offer._id}
                offer={offer}
                isExpanded={expandedOfferId === offer._id}
                onExpand={() => setExpandedOfferId(offer._id)}
              />
            ))}
            <p className="disclaimer-offer-text-v3">
              Choose from these incredible offers that best suit your needs
            </p>
            <p className="disclaimer-text">
              *These pre-approved offers are subject to change at discretion of
              Bank / NBFC after receiving all you documents and details. Final
              offer will be based on risk policy of Bank / NBFC. We do not
              guarantee that final offer will be same as Pre-approved offer.
            </p>
          </div>
        </>
      ) : isFinished ? (
        <div className="no-offers-found">
          <h2 className="congrats-text">
            There is no offer for you currently.
          </h2>
        </div>
      ) : (
        <div className="no-offers-found">
          <h2 className="congrats-text">
            Please wait while we are searching best offers for you
          </h2>
        </div>
      )}
    </div>
  );
};

export default OfferPage;
