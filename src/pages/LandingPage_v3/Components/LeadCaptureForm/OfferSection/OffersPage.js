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

const OfferPage = ({
  formData,
  setFormData,
  setCurrentStep,
  setShowOfferHeaderLogo,
}) => {
  const lead = useSelector((state) => state.app.lead);
  const user = useSelector((state) => state.app.user);
  const offers = useSelector((state) => state.app.offers);
  const dispatch = useDispatch();
  const [isFinished, setIsFinished] = useState(false);
  const [leadId, setLeadId] = useState();
  const [expandedOfferId, setExpandedOfferId] = useState(null);
  const [activeLenders, setActiveLenders] = useState([]);
  const [params] = useSearchParams();

  useEffect(() => {
    fetchActiveLenders();
  }, []);

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

  useEffect(() => {
    if (offers.length > 0) {
      setShowOfferHeaderLogo(false);
    }
  }, [offers]);

  const fetchActiveLenders = async () => {
    try {
      const res = await callApi(`v1/lender/active-lenders`, "get", {}, "loan");
      if (res.status === "Success") {
        setActiveLenders(res.data.lenderList ?? []);
      }
    } catch (err) {
      console.error("Error fetching active lenders", err);
    }
  };

  const submitLead = async () => {
    setUserClickData({
      event_name: "professional-details-submit-for-pl-non-pan",
      user_id: formData.mobile || "No User ID found here",
      affiliate_id: params.get("aff_id") || "No Aff_id found",
    });
    try {
      const trackId = localStorage.getItem(TRACK_ID);
      const processedLead = getAllianceLeadFromMoneyTapInput(
        "website-pl-non-pan",
        {
          ...formData,
          ...user,
        }
      );
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
            utm_term: params.get("utm_term"),
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
      const res = await callApi(
        `v1/loan_offer/lead_id/${leadId}`,
        "get",
        {},
        "core",
        user.token
      );

      if (res.status === "Success" && res.data?.offers?.length > 0) {
        console.log(res);
        const priorityRes = await callApi(
          `v1/finbud_data/finbud_update_priority/${leadId}`,
          "post",
          res,
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
    <div id="offer-page-v4">
      {
        offers.length > 0 ? (
          <>
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
              {offers.map((offer) => (
                <OfferCard
                  key={offer._id}
                  offer={offer}
                  isExpanded={expandedOfferId === offer._id}
                  onExpand={() => setExpandedOfferId(offer._id)}
                />
              ))}
              <p className="disclaimer-offer-text-v4">
                Choose from these incredible offers that best suit your needs
              </p>
              <p className="disclaimer-text">
                *These pre-approved offers are subject to change at discretion
                of Bank / NBFC after receiving all your documents and details.
                Final offer will be based on risk policy of Bank / NBFC. We do
                not guarantee that final offer will be same as Pre-approved
                offer.
              </p>
            </div>
          </>
        ) : isFinished ? (
          setShowOfferHeaderLogo(true) || (
            <div className="no-offers-found">
              <h2 className="congrats-text">
                There is no offer for you currently.
              </h2>
            </div>
          )
        ) : (
          setShowOfferHeaderLogo(true) || (
            <div className="no-offers-found">
              <h2 className="congrats-text">
                Please wait while we are searching best offers for you
              </h2>
            </div>
          )
        )

        // ) : isFinished ? (
        //   <div className="no-offers-found">
        //     <h2 className="congrats-text">
        //       There is no offer for you currently.
        //     </h2>
        //   </div>
        // ) : (
        //   <div className="no-offers-found">
        //     <h2 className="congrats-text">
        //       Please wait while we are searching best offers for you
        //     </h2>
        //   </div>
        // )
      }
    </div>
  );
};

export default OfferPage;
