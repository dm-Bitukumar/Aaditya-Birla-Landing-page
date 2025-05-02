import React, { useEffect, useRef, useState } from "react";
import "./OffersPage.css";
import { useSelector, useDispatch } from "react-redux";
import { setOffers } from "../../../../../store/app/appReducer";
import callApi from "../../../../../utility/apiCaller";
import OfferCard from "./OfferCard";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";
import Header from "../../../../LandingPage_v1/Components/Header/Header";

const OfferPage = () => {
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
  const callCountRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
    if (params.get("utm_source")) setUtmSource(params.get("utm_source"));
    if (params.get("aff_id")) setAffId(params.get("aff_id"));
    if (params.get("utm_term")) setUtmTerm(params.get("utm_term"));
    if (params.get("lid")) setLeadId(params.get("lid"));
  }, [params]);
  console.log("Page opened");
  useEffect(() => {
    fetchActiveLenders();
  }, []);

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

    const fetchAndTrack = async () => {
      if (callCountRef.current >= 4) return;
      await fetchOffers(leadId);
      callCountRef.current += 1;
      if (callCountRef.current === 3 && offers.length === 0) {
        setIsFinished(true);
      }
      if (callCountRef.current >= 4 && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    fetchAndTrack();
    intervalRef.current = setInterval(fetchAndTrack, 5000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [leadId, activeLenders.length]);

  useEffect(() => {
    if (offers.length > 0 && !expandedOfferId) {
      setExpandedOfferId(offers[0]._id);
    }
  }, [offers]);

  const fetchActiveLenders = async () => {
    try {
      const res = await callApi(
        `v1/lender/active-business-lenders`,
        "get",
        {},
        "loan"
      );
      if (res.status === "Success") {
        const apiLenders = res.data.lenderList ?? [];

        const mergedLenders = [...apiLenders];
        setActiveLenders(mergedLenders);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOffers = async (leadId) => {
    if (!leadId || isFinished) return;

    try {
      const loanOfferRes = await callApi(
        `v1/loan_offer/lead_id/${leadId}`,
        "get",
        {},
        "core"
      );

      if (
        loanOfferRes.status === "Success" &&
        loanOfferRes.data?.offers?.length > 0
      ) {
        const fetchedOffers = loanOfferRes.data.offers;

        const filteredOffers = activeLenders.length
          ? fetchedOffers.filter((offer) =>
              activeLenders.some((lender) => lender._id === offer.lender_id)
            )
          : fetchedOffers;
        dispatch(setOffers(filteredOffers));

        if (loanOfferRes.data.lead?.all_responses) {
          setIsFinished(
            loanOfferRes.data.lead.all_responses ===
              loanOfferRes.data.lead.total_response
          );
        }
      }
    } catch (err) {
      console.error("Error in offer fetching:", err);
    }
  };

  return (
    <div className="landing-page-container">
      <Header />
      <div className="final-offers-container">
        <div className="offer-bg-layer" />
        {/* <img src="/assets/img/Gift.png" className="gift-icon" alt="Gift" /> */}

        <h2 className="congrats-text">Congratulations!</h2>
        <h3 className="sub-text-v1">You’re Pre-Approved for</h3>
        <h3 className="sub-text-v1">a Personal Loan!</h3>
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
        <p className="disclaimer-offer-text-v3">
          Choose from these incredible offers that best suit your needs
        </p>
        <p className="disclaimer-text">
          *These pre-approved offers are subject to change at discretion of Bank
          / NBFC after receiving all you documents and details. Final offer will
          be based on risk policy of Bank / NBFC. We do not guarantee that final
          offer will be same as Pre-approved offer.
        </p>
      </div>
    </div>
  );
};

export default OfferPage;
