import React from "react";
import { useNavigate } from "react-router-dom";
import OfferDetailsSegment from "./components/OfferDetailsSegment";

const OffersPage = () => {
  const navigate = useNavigate();

  return (
    <div className={"form-signin-container pt-0"}>
      <OfferDetailsSegment />
    </div>
  );
};

export default OffersPage;
