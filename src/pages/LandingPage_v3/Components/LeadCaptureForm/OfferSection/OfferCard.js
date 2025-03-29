import React, { useState } from "react";
import "./OffersPage.css";

const OfferCard = ({ offer }) => {
  const [expanded, setExpanded] = useState(false);
  console.log(offer);
  return (
    <div className="offer-card-section">
      <div
        className={`offer-card ${expanded ? "expanded" : "collapsed"}`}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <img src={offer.logo_image_url} className="lender-logo" alt="Lender" />
        <div className="offer-details">
          <hr className="offer-divider" />
          <div className="amount-row">
            <span className="amount-label">Pre-Approved Amount:</span>
            <span className="amount-value">
              ₹{Number(offer.credit_limit).toLocaleString("en-IN")}
            </span>
          </div>
          <hr className="offer-divider" />

          {expanded && (
            <>
              <div className="emi-row">
                <span className="tenure">Tenure: {offer.tenure} Months</span>
                <span className="emi">
                  EMI: ₹{Number(offer.emi).toLocaleString("en-IN")}
                </span>
              </div>

              <button className="get-offer-btn">
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
