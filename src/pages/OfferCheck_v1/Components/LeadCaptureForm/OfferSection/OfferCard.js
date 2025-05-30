import React from "react";
import "./OffersPage.css";
import { setUserClickData } from "../../../../../utility/setUserClickData";
import { useSearchParams } from "react-router-dom";

const OfferCard = ({ offer, isExpanded, onExpand }) => {
  const [params] = useSearchParams();
  const handleClick = () => {
    setUserClickData({
      event_name: `offer-apply-button-offer-check-v1-${offer.lender_name}`,
      user_id: offer.lead_id || "No User ID found",
      affiliate_id: params.get("aff_id") || "No Aff_id found",
    });
    setUserClickData({
      event_name: `offer-apply-button-offer-check-v1`,
      user_id: offer.lead_id || "No User ID found",
      affiliate_id: params.get("aff_id") || "No Aff_id found",
    });

    window.location.href = `${offer.app_url}`;
  };

  const isLNT = offer.lender_id === "662752eb65fdba1a48d6e482";
  const horizontalLogo = isLNT
    ? "https://digitmoney.in/image/partners/lnt.png"
    : offer.banking_partners_hl || offer.logo_image_url;

  const verticalLogo = isLNT
    ? "https://digitmoney.in/image/partners/lnt.png"
    : offer.banking_partners_vl || offer.logo_image_url;

  return (
    <div className="offer-card-section1">
      <div
        className={`offer-card1 ${isExpanded ? "expanded1" : "collapsed1"}`}
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
                <span className="amount-label1">
                  {[
                    "662752eb65fdba1a48d6e466",
                    "666ec1953a9a969d8f9980f1",
                    "67762d497ae263a3ec86347e",
                    "6799b8fada60414f0f195bf9",
                    "67bd3abe694463207380f33d",
                    "67be8fc6049b9a4e3af8191a",
                    "67e23d6fe162ba8f717ec5bf",
                    "67ef646df80610d286084e60",
                  ].includes(offer.lender_id)
                    ? "Max Loan Amount:"
                    : "Pre-Approved Amount:"}
                </span>
                <span className="amount-value1">
                  ₹{Number(offer.credit_limit).toLocaleString("en-IN")}
                </span>
              </div>
            </>
          ) : (
            <div className="amount-row">
              <img src={verticalLogo} className="lender-logo" alt="Lender" />
              <div>
                <span className="amount-label1">
                  {[
                    "662752eb65fdba1a48d6e466",
                    "666ec1953a9a969d8f9980f1",
                    "67762d497ae263a3ec86347e",
                    "6799b8fada60414f0f195bf9",
                    "67bd3abe694463207380f33d",
                    "67be8fc6049b9a4e3af8191a",
                    "67e23d6fe162ba8f717ec5bf",
                    "67ef646df80610d286084e60",
                  ].includes(offer.lender_id)
                    ? "Max Loan Amount:"
                    : "Pre-Approved Amount:"}
                </span>
                <br />
                <span className="amount-value1">
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
                className="get-offer-btn tracking-get-offer-btn-v5"
                // id={`btn-get-offer-${
                //   offer.lender_name?.toLowerCase().replace(/\s+/g, "-") ||
                //   "unknown"
                // }-v5`}
                id={`btn-get-offer-v5`}
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
            src="/assets/img/arrowOffer.png"
            className="collapse-arrow1"
            alt="Expand"
          />
        )}
      </div>
    </div>
  );
};

export default OfferCard;
