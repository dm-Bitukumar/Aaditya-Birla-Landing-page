import React from "react";
import "./OffersPage.css";
import { setUserClickData } from "../../../../../utility/setUserClickData";

const OfferCard = ({ offer, isExpanded, onExpand }) => {
  const handleClick = () => {
    setUserClickData({
      event_name: `offer-apply-button-for-pl-non-pan-lender-${offer.lender_name}`,
      user_id: offer.lead_id || "No User ID found",
    });
    setUserClickData({
      event_name: `offer-apply-button-for-pl-non-pan`,
      user_id: offer.lead_id || "No User ID found",
    });

    window.location.href = `${offer.app_url}`;
  };

  return (
    <div className="offer-card-section">
      <div
        className={`offer-card ${isExpanded ? "expanded" : "collapsed"}`}
        onClick={onExpand}
      >
        {isExpanded && (
          <>
            <img
              src={offer.logo_image_url}
              className="lender-logo"
              alt="Lender"
            />
          </>
        )}

        <div className="offer-details">
          {isExpanded && <hr className="offer-divider" />}

          {isExpanded ? (
            <>
              <div className="amount-row">
                <span className="amount-label">Pre-Approved Amount:</span>
                <span className="amount-value">
                  ₹{Number(offer.credit_limit).toLocaleString("en-IN")}
                </span>
              </div>
            </>
          ) : (
            <div className="amount-row">
              <img
                src={offer.logo_image_url}
                className="lender-logo"
                alt="Lender"
              />
              <div>
                <span className="amount-label">Pre-Approved Amount:</span>
                <br />
                <span className="amount-value">
                  ₹{Number(offer.credit_limit).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          )}

          {isExpanded && <hr className="offer-divider" />}

          {isExpanded && (
            <>
              <div className="emi-row">
                <span className="tenure">Tenure: {offer.tenure} Months</span>
                <span className="vertical-divide">|</span>
                <span className="emi">
                  EMI: ₹{Number(offer.emi).toLocaleString("en-IN")}
                </span>
              </div>

              <button
                className="get-offer-btn tracking-get-offer-btn-v4"
                id={`btn-get-offer-${
                  offer.lender_name?.toLowerCase().replace(/\s+/g, "-") ||
                  "unknown"
                }-v4`}
                onClick={handleClick}
              >
                {" "}
                Get Offer{" "}
                <img
                  src="/assets/img/Get offer CTA icon.svg"
                  alt="Arrow"
                  className="cta-icon"
                />
              </button>
            </>
          )}
        </div>

        {!isExpanded && (
          <img
            src="/assets/img/offers arrow.svg"
            className="collapse-arrow"
            alt="Expand"
          />
        )}
      </div>
    </div>
  );
};

export default OfferCard;
