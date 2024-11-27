import React from "react";
import OfferTile from "../../PreapprovedOffer/components/OfferTile";

const OffersPage = ({ userData }) => {
  return (
    <div>
      <h2>Pre-Approved Offers</h2>
      {userData.offers.length > 0 ? (
        userData.offers.map((offer) => <OfferTile key={offer.id} offer={offer} />)
      ) : (
        <p>No offers available at this time.</p>
      )}
    </div>
  );
};

export default OffersPage;
