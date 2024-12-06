import React, { useEffect, useState } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import OfferTileRedirect from "./OfferTileRedirect"; 
import "./PreApproved.css";
import callApi from "../../../utility/apiCaller";
import { useSelector } from "react-redux";
import { TRACK_ID } from "../../../utility/enum";

const OfferSearchPage = ({ pancard, leadId, offerSearchData  }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [offerDetails, setOfferDetails] = useState(null); 
  const [redirectionLink, setRedirectionLink] = useState(""); 
  const [isFinished, setIsFinished] = useState(false);

  const user = useSelector((state) => state.app.user);
  const personalDetails = useSelector((state) => state.app.personalDetails);
  const workDetails = useSelector((state) => state.app.workDetails);
  const panDetails = useSelector((state) => state.app.panDetails);

  useEffect(() => {
    const fetchOfferDetails = async () => {
      if (!leadId) {
        console.error("No lead ID provided.");
        return;
      }

      const payload = {
        ...offerSearchData,
        contact_name: `${personalDetails?.firstName || ""} ${
          personalDetails?.lastName || ""
        }`.trim(),
        contact_phone: user?.contact_phone || "",
        // contact_phone: "9820956927",
        pancard: panDetails?.pancard || "",
        profession_type: workDetails?.professionType || "",
        gender: personalDetails?.gender || "", 
        dob: personalDetails?.dob || "",
        pincode: personalDetails?.pincode || "",
        company_name: workDetails?.companyName || "",
        monthly_income: workDetails?.monthlyIncome || "",
        contact_email: personalDetails?.email || "",
        loan_type: "business_loan",
      };

      try {
        setIsLoading(true);
        const response = await callApi(
          `v1/lender/lender-first-check`,
          "post",
          payload,
          "loan"
        );

        if (response.status === "Success" && response.data?.status === true) {
          const offer = response.data; 
          setOfferDetails(offer);
          setRedirectionLink(offer.app_url || ""); 
        } else {
          console.error("No valid offers found:", response.data?.message || "Unknown error");
          await handleFallback(payload);
        }
      } catch (error) {
        console.error("Error fetching offer details:", error);
        await handleFallback(payload);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOfferDetails();
  }, [leadId, offerSearchData]);

  const handleFallback = async (payload) => {
    try {
      const trackId = localStorage.getItem(TRACK_ID);

      const processedPayload = {
        ...payload,
        tracking_id: trackId,
        lead_id: undefined, 
      };

      const leadResponse = await callApi(
        "v1/lead/website-lead",
        "post",
        { lead: processedPayload },
        "core",
        user.token
      );

      if (leadResponse.status === "Success" && leadResponse.data?.lead) {
        const newLeadId = leadResponse.data.lead._id;

        await fetchOffers(newLeadId);
      } else {
        console.error("Error generating new lead ID.");
        setOfferDetails(null);
      }
    } catch (error) {
      console.error("Error in fallback handleFallback:", error);
      setOfferDetails(null);
    }
  };

  const fetchOffers = async (leadId) => {
    if (!leadId) {
      console.error("No lead ID available for fetching offers.");
      return;
    }

    try {
      const res = await callApi(
        `v1/loan_offer/lead_id/${leadId}`,
        "get",
        {},
        "core",
        user.token
      );

      if (res.status === "Success" && res.data?.offers?.length > 0) {
        setOfferDetails(res.data.offers[0]); 
        setRedirectionLink(res.data.offers[0]?.app_url || "");
        setIsFinished(true);
      } else {
        console.error("No offers found in fallback.");
        setOfferDetails(null);
      }
    } catch (err) {
      console.error("Error in fallback fetchOffers:", err);
      setOfferDetails(null);
    }
  };

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

          <div key={offerDetails.customer_id} className="my-4">
            <OfferTileRedirect
              small={false}
              offer={{
                credit_limit: offerDetails?.offers?.[0]?.credit_limit ?? 0,
                emi: offerDetails?.offers?.[0]?.emi ?? 0,
                tenure: offerDetails?.offers?.[0]?.tenure ?? "N/A",
                interest: offerDetails?.offers?.[0]?.interest ?? "N/A",
                app_url: redirectionLink,
              }}
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
