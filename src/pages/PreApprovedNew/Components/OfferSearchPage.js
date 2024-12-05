import React, { useEffect, useState } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import callApi from "../../../utility/apiCaller";
import OfferTileRedirect from "./OfferTileRedirect"; 
import "./PreApproved.css";

const OfferSearchPage = ({ leadId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [offerDetails, setOfferDetails] = useState(null); 
  const [redirectionLink, setRedirectionLink] = useState(""); 

  useEffect(() => {
    const fetchOfferDetails = async () => {
      if (!leadId) {
        console.error("No lead ID provided.");
        return;
      }

      console.log(`Fetching offer details for Lead ID: ${leadId}`);

      try {
        setIsLoading(true);
        const response = await callApi(
          `v1/preapproved_lead/${leadId}`,
          "get",
          {},
          "core"
        );

        if (response.status === "Success" && response.data?.preapproved_lead) {
          const offer = response.data.preapproved_lead;
          setOfferDetails(offer);
          setRedirectionLink(offer.redirection_link || ""); // Store redirection link

          console.log("Offer details fetched successfully:", offer); // Debug log
          console.log("Redirection link stored:", offer.redirection_link);
        } else {
          console.error("Failed to fetch offer details or no details available.");
        }
      } catch (error) {
        console.error("Error fetching offer details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOfferDetails();
  }, [leadId]);

  return (
    <div className={"form-signin-apply form-signin"}>
      <HeadBar />

        {isLoading && (
          <div className="mb-4 font-normal text-center">
            <img
              src="/assets/img/Design_last_page.png"
              alt="Loading offers"
              className="offer-search-image"
            />
            <p className="offer-search-text">
              Please wait while we are searching the best offer for you...
            </p>
          </div>
        )}

        {!isLoading && !offerDetails && (
          <div className="mb-4 font-normal text-center">
            No offers found for your profile at the moment.
          </div>
        )}

        {!isLoading && offerDetails && (
          <div className="flex flex-col items-center justify-center">
            <img src="/assets/img/Dm LOGO.png" alt="Logo" />

            <h3 className="mt-8 text-lg text-center">
              Congratulations{" "}
              <span className="text-2xl font-normal">
                {offerDetails.contact_name || "Dear Customer"}!!
              </span>
            </h3>
            <h3 className="text-lg text-center">
              Your pre-approved offers from {offerDetails.lender_name}
            </h3>

            <div key={offerDetails._id} className="my-4">
              <OfferTileRedirect
                small={false}
                offer={offerDetails}
                redirectionLink={redirectionLink} 
              />
            </div>

            <h4 className="mt-4 text-xs text-center">
              *These pre-approved offers are subject to change at discretion of Bank / NBFC after
              receiving all your documents and details. Final offer will be based on risk policy of
              Bank / NBFC. We do not guarantee that final offer will be same as Pre-approved offer.
            </h4>
          </div>
        )}
      </div>
  );
};

export default OfferSearchPage;
