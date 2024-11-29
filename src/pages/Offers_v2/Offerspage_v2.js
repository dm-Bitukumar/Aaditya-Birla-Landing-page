import React from "react";
import { useNavigate } from "react-router-dom";
import OfferDetails_v2 from "./components/OfferDetails_v2";

const OffersPage_v2 = () => {
  const navigate = useNavigate();

  return (
    <div className={"form-signin-container pt-0"}>
      <OfferDetails_v2 />
    </div>
  );
};

export default OffersPage_v2;
