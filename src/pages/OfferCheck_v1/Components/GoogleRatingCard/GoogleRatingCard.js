import React from "react";
import "./GoogleRatingCard.css";

const GoogleRatingCard = () => {
  return (
    <div className="google-rating-wrapper">
      {/* <div className="google-rating-card">
        <img
          src="/assets/img/google.png"
          alt="Google Logo"
          className="google-logo"
        />
        <div className="google-rating-text">
          <p className="review-text">
            <span>1 Lac+ Customers have</span>
            <br />
            <span>availed loans with us.</span>
          </p>
          <div className="rating-row">
            <span className="rating-score">4.7</span>
            <img
              src="/assets/img/starrating.png"
              alt="Rating Stars"
              className="stars-img"
            />
          </div>
        </div>
      </div> */}
      <img
        src="/assets/img/Reviewwhite.png"
        alt="Rating Stars"
        // className="stars-img"
      />
    </div>
  );
};

export default GoogleRatingCard;
