import React, { useEffect } from "react";
import callApi from "../../../utility/apiCaller";
import "./PreApproved.css"; 

const OfferSearchPage = ({ setStep, userData }) => {
  // useEffect(() => {
  //   const fetchOffers = async () => {
  //     const response = await callApi("v1/offers/fetch", "post", { userData }, "core");
  //     if (response.status === "Success" && response.data.offers.length > 0) {
  //       setStep(7);
  //     } else {
  //       setStep(8);
  //     }
  //   };

  //   fetchOffers();
  // }, [setStep, userData]);

  return (
    <div className="offer-search-container">
      <div className="offer-search-wrapper">
        <img
          src="/assets/img/Design_last_page.png"
          alt="Loading offers"
          className="offer-search-image"
        />
        <p className="offer-search-text">
          Please wait while we are searching the best offer for you...
        </p>
      </div>
    </div>
  );
};

export default OfferSearchPage;
