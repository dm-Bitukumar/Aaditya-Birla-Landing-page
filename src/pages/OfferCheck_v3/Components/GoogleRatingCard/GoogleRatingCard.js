import React from "react";
import "./GoogleRatingCard.css";

const GoogleRatingCard = () => {
  return (
    <div className="google-rating-wrapper">
      <div className="google-rating-card-v3">
        <div className="google-rating-text">
          <img src="/assets/img/review_black.png"
          alt="Google Rating Logo" />
        </div>
      </div>
    </div>
  );
};

export default GoogleRatingCard;
