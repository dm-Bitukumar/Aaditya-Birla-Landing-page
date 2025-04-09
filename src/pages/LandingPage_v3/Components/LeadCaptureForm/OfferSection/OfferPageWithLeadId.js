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
import Header from "../../../../LandingPage_v3/Components/Header/Header";

const OfferPage = ({ formData, setFormData, setCurrentStep }) => {
  const lead = useSelector((state) => state.app.lead);
  const user = useSelector((state) => state.app.user);
  const offers = useSelector((state) => state.app.offers);
  const dispatch = useDispatch();
  const [isFinished, setIsFinished] = useState(false);
  const [source, setSource] = useState("");
  const [utmSource, setUtmSource] = useState("");
  const [utmTerm, setUtmTerm] = useState("");
  const [affId, setAffId] = useState("");
  const [leadId, setLeadId] = useState();
  const [expandedOfferId, setExpandedOfferId] = useState(null);
  const [activeLenders, setActiveLenders] = useState([]);
  const [params] = useSearchParams();

  useEffect(() => {
    fetchActiveLenders();
  }, []);

  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
    if (params.get("utm_source")) setUtmSource(params.get("utm_source"));
    if (params.get("aff_id")) setAffId(params.get("aff_id"));
    if (params.get("utm_term")) setUtmTerm(params.get("utm_term"));
    if (params.get("lid")) setLeadId(params.get("lid"));
  }, [params]);

  useEffect(() => {
    const checkLeadIdInterval = setInterval(() => {
      if (params.get("lead_id")) {
        const id = params.get("lead_id");
        setLeadId(id);
        clearInterval(checkLeadIdInterval);
      }
    }, 1000);

    return () => clearInterval(checkLeadIdInterval);
  }, [params]);

  useEffect(() => {
    if (!leadId || activeLenders.length === 0) return;

    fetchOffers(leadId);
    const interval = setInterval(() => {
      fetchOffers(leadId);
    }, 5000);

    return () => clearInterval(interval);
  }, [leadId, activeLenders]);

  useEffect(() => {
    if (offers.length > 0 && !expandedOfferId) {
      setExpandedOfferId(offers[0]._id);
    }
  }, [offers]);

  const fetchActiveLenders = async () => {
    try {
      const res = await callApi(`v1/lender/active-lenders`, "get", {}, "loan");
      if (res.status === "Success") {
        const apiLenders = res.data.lenderList ?? [];

        const hardcodedLender = {
          _id: "662752eb65fdba1a48d6e482",
          lender_name: "L&T",
        };

        const mergedLenders = [...apiLenders, hardcodedLender];

        setActiveLenders(mergedLenders);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const submitLead = async () => {
    setUserClickData({
      event_name: "professional-details-submit-for-pl-non-pan",
      user_id: formData.mobile || "No User ID found here",
    });
    try {
      const trackId = localStorage.getItem(TRACK_ID);
      const processedLead = getAllianceLeadFromMoneyTapInput("website", {
        ...formData,
        ...user,
      });

      const res = await callApi(
        "v1/lead/finbud-lp-lead",
        "post",
        {
          lead: {
            ...processedLead,
            tracking_id: trackId,
            aff_id: affId,
            utm_source: utmSource,
            utm_medium: sourceConvert(source),
            utm_term: utmTerm,
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
            event_name: "process-lead-for-pl-non-pan",
            user_id: contactPhone || newLeadId || "No User ID found here",
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
        "core"
      );

      if (res.status === "Success" && res.data?.offers?.length > 0) {
        const priorityRes = await callApi(
          `v1/finbud_data/finbud_update_priority/${leadId}`,
          "post",
          res,
          "loan"
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
          const filteredOffers = activeLenders.length
            ? sortedOffers.filter((offer) =>
                activeLenders.some((lender) => lender._id === offer.lender_id)
              )
            : sortedOffers;

          dispatch(setOffers(filteredOffers));

          if (priorityRes.data.lead?.all_responses) {
            setIsFinished(
              priorityRes.data.lead.all_responses ===
                priorityRes.data.lead.total_response
            );
          }
        } else {
          toast.error("Failed to fetch prioritized offers.");
        }
      }
    } catch (err) {
      console.error("Error in offer fetching and prioritizing:", err);
      toast.error("Something went wrong while fetching offers.");
    }
  };

  return (
    <div className="landing-page-container2">
      <Header />
      <div className="final-offers-container-v3">
        <>
          <video
            className="background-video1"
            src="/assets/img/BG video.mp4"
            autoPlay
            loop
            muted
          />
          <img
            src="/assets/img/Offers BG.svg"
            alt="Square Check Background"
            className="background-overlay-img-offer"
          />
        </>
        <div className="offer-bg-layer-v3">
          <h2 className="congrats-text">Congratulations!</h2>
          <h3 className="sub-text">You’re Pre-Approved for</h3>
          <h3 className="sub-text">a Personal Loan!</h3>
        </div>
      </div>

      <div className="offer-cards-container">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <OfferCard
              key={offer._id}
              offer={offer}
              isExpanded={expandedOfferId === offer._id}
              onExpand={() => setExpandedOfferId(offer._id)}
            />
          ))
        ) : (
          <p className="loading-text">
            {isFinished
              ? "There is no offer for you currently."
              : "Please wait while we are searching best offers for you"}
          </p>
        )}

        <p className="disclaimer-offer-text-v4">
          Choose from these incredible offers that best suit your needs
        </p>
        <p className="disclaimer-text">
          *These pre-approved offers are subject to change at discretion of Bank
          / NBFC after receiving all your documents and details. Final offer
          will be based on risk policy of Bank / NBFC. We do not guarantee that
          final offer will be same as Pre-approved offer.
        </p>
      </div>
    </div>
  );
};

export default OfferPage;
