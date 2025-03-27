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
  const [source, setSource] = useState("");
  const [utmSource, setUtmSource] = useState("");
  const [affId, setAffId] = useState("");
  const [leadId, setLeadId] = useState();
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
    if (params.get("utm_source")) setUtmSource(params.get("utm_source"));
    if (params.get("aff_id")) setAffId(params.get("aff_id"));
  }, [params]);

  useEffect(() => {
    if (formData.stepDone === 3 && !leadId) {
      submitLead();
    }
  }, [formData]);

  useEffect(() => {
    console.log("Lead ID ",lead);
    if (!lead?._id) return;
    fetchOffers(lead._id);
    const interval = setInterval(() => {
      fetchOffers(lead._id);
    }, 5000);

    return () => clearInterval(interval);
  }, [lead]);

  const submitLead = async () => {
    setUserClickData({
      event_name: "personal-detail-api-v2",
      user_id: formData.mobile || "No User ID found here",
    });
    try {
      const trackId = localStorage.getItem(TRACK_ID);
      const processedLead = getAllianceLeadFromMoneyTapInput("website", {
        ...formData,
        ...user
      });
      console.log("processedLead:",processedLead);
      const res = await callApi(
        "v1/lead/finbud-lp-lead",
        "post",
        {
          lead: {
            ...processedLead,
            tracking_id: trackId,
            aff_id: 49,
            utm_source: utmSource,
            utm_medium: sourceConvert(source),
          },
        },
        "core",
        user.token
      );
      console.log(res);
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
            event_name: "process-lead-for-loan-personal-loan-v2",
            user_id: contactPhone || leadId || "No User ID found here",
          });
          fetchOffers(newLeadId);
        }
      }
    } catch (err) {
      toast("Some error occurred", { hideProgressBar: true, type: "error" });
      console.log(err);
    }
  };

  const fetchOffers = async (leadId) => {
    if (!leadId || isFinished) return;
    try {
      const res = await callApi(
        `v1/loan_offer/lead_id/${leadId}`,
        "get",
        {},
        "core",
        user.token
      );
      if (res.status === "Success") {
        const uniqueOffers = _.uniqBy(res.data.offers ?? [], "lender_id");
        dispatch(setOffers(uniqueOffers));
        if (res.data.lead?.all_responses) {
          setIsFinished(
            res.data.lead?.all_responses === res.data.lead?.total_response
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="final-offers-container">
      <div className="offer-bg-layer-1" />
      <div className="offer-bg-layer-2" />
      <div className="offer-bg-layer-3" />
      <img src="/assets/img/Gift.png" className="gift-icon" alt="Gift" />

      <h2 className="congrats-text">Congratulations!</h2>
      <h3 className="sub-text">You’re Pre-Approved for a Personal Loan!</h3>

      <div className="offer-cards-container">
        {offers.length < 0 ? (
          offers.map((offer) => <OfferCard key={offer._id} offer={offer} />)
        ) : (
          <p className="loading-text">
            {isFinished
              ? "There is no offer for you currently."
              : "Please wait while we are searching best offers for you"}
          </p>
        )}
      </div>

      <p className="disclaimer-text">
        *These pre-approved offers are subject to change at discretion of Bank /
        NBFC after receiving all your documents and details. Final offer will be
        based on risk policy of Bank / NBFC.
      </p>
    </div>
  );
};

export default OfferPage;
