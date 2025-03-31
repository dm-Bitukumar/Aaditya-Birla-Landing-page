import React, { useState } from "react";
import "./OffersPage.css";
import { setUserClickData } from "../../../../../utility/setUserClickData";

const OfferCard = ({ offer }) => {
  const [expanded, setExpanded] = useState(false);
  console.log(offer);
  const handleClick = () => {
    setUserClickData({
      event_name: `offer-apply-button-for-lp-non-pan-lender-${offer.lender_name}`,
      user_id: offer.lead_id || "No User ID found",
    });

    window.location.href = `${offer.app_url}`;
    // var win = window.open(`${offer.app_url}${source}`);
    // win.focus();
  };
  return (
    <div className="offer-card-section">
      <div
        className={`offer-card ${expanded ? "expanded" : "collapsed"}`}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded && (
          <>
            <img
              src={offer.logo_image_url}
              className="lender-logo"
              alt="Lender"
            />
          </>
        )}

        <div className="offer-details">
          {expanded && (
            <>
              <hr className="offer-divider" />
            </>
          )}

          {expanded ? (
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

          {expanded && (
            <>
              <hr className="offer-divider" />
            </>
          )}

          {expanded && (
            <>
              <div className="emi-row">
                <span className="tenure">Tenure: {offer.tenure} Months</span>
                <span class="vertical-divide">|</span>
                <span className="emi">
                  EMI: ₹{Number(offer.emi).toLocaleString("en-IN")}
                </span>
              </div>

              <button className="get-offer-btn" onClick={handleClick}>
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
        {!expanded && (
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
