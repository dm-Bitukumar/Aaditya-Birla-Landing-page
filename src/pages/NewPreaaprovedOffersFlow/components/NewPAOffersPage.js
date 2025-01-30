import React, { useEffect, useState, useRef } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import callApi from "../../../utility/apiCaller";
import OfferTile from "./OfferTileFBFlow";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { lenderMappings } from "../../PreApprovedNew/PreApprovedNew";
import FormButton from "../../../components/Buttons/FormButton";

const OffersPage = () => {
  const [primaryOffer, setPrimaryOffer] = useState(null);
  const [secondaryOffers, setSecondaryOffers] = useState([]);
  const [contactName, setContactName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [phone, setPhone] = useState(null);
  const [ldr, setLdr] = useState(null);
  const [utmSource, setUtmSource] = useState(null);
  const [params] = useSearchParams();

  const apiCallInProgress = useRef(false);

  const showOfferLenderIds = [
    "66b76539fadd84ed521dcd2a", // ABFL
    "6799b8fada60414f0f195bf9", // Poonawalla
  ];

  useEffect(() => {
    const fetchedPhone = params.get("phone");
    const fetchedLdr = params.get("ldr");

    setPhone(fetchedPhone);
    setLdr(fetchedLdr);
    setUtmSource(params.get("utmsource"));

    if (fetchedPhone) {
      fetchOffers(fetchedPhone, fetchedLdr);
    }
  }, [params]);

  const fetchOffers = async (phone, ldr) => {
    if (!phone || apiCallInProgress.current) return;
    apiCallInProgress.current = true;

    try {
      setIsLoading(true);

      const requestBody = {
        pageNum: 1,
        pageSize: 1000,
        filters: {
          contact_phone: phone,
        },
      };

      const res = await callApi(
        "v1/preapproved_lead/list",
        "post",
        requestBody,
        "core"
      );

      if (
        res.status === "Success" &&
        res.data?.preapproved_leadList?.length > 0
      ) {
        const offers = res.data.preapproved_leadList;
        const primaryLender = lenderMappings[ldr]?.lenderId;

        const validOffers = offers.filter((offer) =>
          showOfferLenderIds.includes(offer.lender_id)
        );

        const primaryOffer = validOffers.find(
          (offer) => offer.lender_id === primaryLender
        );

        const secondaryOffers = validOffers.filter(
          (offer) => offer.lender_id !== primaryLender
        );

        console.log("Primary Offer Found:", primaryOffer);
        console.log("Secondary Offers Found:", secondaryOffers);

        setPrimaryOffer(primaryOffer || null);
        setSecondaryOffers(secondaryOffers);

        const OfferIdNameFetch = primaryOffer?._id || secondaryOffers[0]?._id; 
        if (OfferIdNameFetch) {
          fetchContactName(OfferIdNameFetch);
        }
      } else {
        console.error("No preapproved loans found for the provided filters.");
        toast.error("No offers found for your profile.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error in fetchOffers:", err);
      toast.error("Failed to fetch preapproved loans.");
      setIsLoading(false);
    } finally {
      apiCallInProgress.current = false;
      setIsLoading(false);
    }
  };

  const fetchContactName = async (offerId) => {
    try {
      const res = await callApi(
        `v1/preapproved_lead/${offerId}`,
        "get",
        {},
        "core"
      );

      if (res.status === "Success" && res.data?.preapproved_lead) {
        const fullName = res.data.preapproved_lead.contact_name || "Customer";
        const firstName = fullName.split(" ")[0]; // Extract first name
        setContactName(firstName);
      }
    } catch (err) {
      console.error("Error fetching contact name:", err);
    }
  };

  return (
    <div className={"form-signin-apply form-signin"}>
      <HeadBar />

      {isLoading && (
        <div className="mb-4 font-normal text-center">
          Please wait while we are searching the best offers for you
          <span className="ml-2 dot-pulse"></span>
        </div>
      )}

      {!isLoading && !primaryOffer && secondaryOffers.length === 0 && (
        <div className="mb-4 font-normal text-center">
          No offers found for your profile at the moment.
        </div>
      )}

      {!isLoading && (primaryOffer || secondaryOffers.length > 0) && (
        <div className="flex flex-col items-center justify-center">
          <img src="/assets/img/Dm LOGO.png" />

          <h3 className="mt-8 text-lg text-center">
            Congratulations{" "}
            <span className="text-2xl font-normal">
              {contactName || "Dear Customer"}!!
            </span>
          </h3>

          <h3 className="text-base text-center">
            Your pre-approved offers are
          </h3>

          {primaryOffer && (
            <>
              <div key={primaryOffer._id} className="my-4">
                <OfferTile
                  small={false}
                  offer={primaryOffer}
                  mobileNumber={phone}
                />
              </div>
            </>
          )}

          {secondaryOffers.length > 0 && (
            <>
              <div className="flex flex-col items-center justify-center">
                {secondaryOffers.map((offer) => (
                  <div key={offer._id} className="my-4">
                    <OfferTile
                      small={false}
                      offer={offer}
                      mobileNumber={phone || "unknown"}
                    />
                  </div>
                ))}
              </div>

              <FormButton
                onClick={() => (window.location.href = "tel:18002093997")}
                className="!mt-2 !w-40"
              >
                Call Us
              </FormButton>
            </>
          )}

          <h4 className="mt-4 text-xs text-center">
            *These pre-approved offers are subject to change at discretion of
            Bank / NBFC after receiving all your documents and details. Final
            offer will be based on risk policy of Bank / NBFC. We do not
            guarantee that final offer will be same as Pre-approved offer.
          </h4>
        </div>
      )}
    </div>
  );
};

export default OffersPage;
