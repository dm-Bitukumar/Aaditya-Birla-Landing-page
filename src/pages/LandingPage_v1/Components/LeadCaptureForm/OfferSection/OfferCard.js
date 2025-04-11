import React, { useState } from "react";
import "./OffersPage.css";
import { setUserClickData } from "../../../../../utility/setUserClickData";
import { useSearchParams } from "react-router-dom";

const OfferCard = ({ offer, isExpanded, onExpand }) => {
  const [expanded, setExpanded] = useState(false);
  const [params] = useSearchParams();
  console.log(offer);
  const handleClick = () => {
    setUserClickData({
      event_name: `offer-apply-button-for-pl-pan-lender-${offer.lender_name}`,
      user_id: offer.lead_id || "No User ID found",
      affiliate_id: params.get("aff_id") || "No Aff_id found",
    });
    setUserClickData({
      event_name: `offer-apply-button-for-pl-pan`,
      user_id: offer.lead_id || "No User ID found",
      affiliate_id: params.get("aff_id") || "No Aff_id found",
    });

    window.location.href = `${offer.app_url}`;
    // var win = window.open(`${offer.app_url}${source}`);
    // win.focus();
  };

  const isLNT = offer.lender_id === "662752eb65fdba1a48d6e482";
  const horizontalLogo = isLNT
    ? "https://digitmoney.in/image/partners/lnt.png"
    : offer.banking_partners_hl || offer.logo_image_url;

  const verticalLogo = isLNT
    ? "https://digitmoney.in/image/partners/lnt.png"
    : offer.banking_partners_vl || offer.logo_image_url;

  return (
    <div className="offer-card-section">
      <div
        className={`offer-card ${isExpanded ? "expanded" : "collapsed"}`}
        onClick={onExpand}
      >
        {isExpanded && (
          <>
            <img src={horizontalLogo} className="lender-logo" alt="Lender" />
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
              <img src={verticalLogo} className="lender-logo" alt="Lender" />
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
                <span class="vertical-divide">|</span>
                <span className="emi">
                  EMI: ₹{Number(offer.emi).toLocaleString("en-IN")}
                </span>
              </div>

              <button
                className="get-offer-btn tracking-get-offer-btn-v3"
                // id={`btn-get-offer-${
                //   offer.lender_name?.toLowerCase().replace(/\s+/g, "-") ||
                //   "unknown"
                // }-v3`}
                id={`btn-get-offer-v3`}
                onClick={handleClick}
              >
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
