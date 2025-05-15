import React, { useEffect, useState } from "react";
import "./OffersPage.css";
import { useSelector, useDispatch } from "react-redux";
import { setOffers } from "../../../../../store/app/appReducer";
import callApi from "../../../../../utility/apiCaller";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { setUserClickData } from "../../../../../utility/setUserClickData";
import OfferCard from "./OfferCard";
import { TRACK_ID } from "../../../../../utility/enum";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";

const OfferPage = ({ formData, setShowOfferHeaderLogo }) => {
  const lead = useSelector((state) => state.app.lead);
  const user = useSelector((state) => state.app.user);
  const offers = useSelector((state) => state.app.offers);
  const dispatch = useDispatch();
  const [isFinished, setIsFinished] = useState(false);
  const [leadId, setLeadId] = useState();
  const [expandedOfferId, setExpandedOfferId] = useState(null);
  const [activeLenders, setActiveLenders] = useState([]);
  const [params] = useSearchParams();
  const [isTncChecked, setIsTncChecked] = useState(true);
  const mobile = formData?.mobile || "";
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const token = user?.token;

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

  return (
    <div id="offer-page-v5">
      {offers.length > 0 ? (
        <>
          <div className="final-offers-container-v5">
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
            <div className="offer-bg-layer-v5">
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
            <p className="disclaimer-offer-text-v5">
              Choose from these incredible offers that best suit your needs
            </p>
            <p className="disclaimer-text">
              *These pre-approved offers are subject to change at discretion of
              Bank / NBFC after receiving all your documents and details. Final
              offer will be based on risk policy of Bank / NBFC. We do not
              guarantee that final offer will be same as Pre-approved offer.
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
      )}
    </div>
  );
};

export default OfferPage;
