import React, { useEffect, useState, useRef } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import Stepper from "../../../components/Form/Stepper";
import FormButton from "../../../components/Buttons/FormButton";
import callApi from "../../../utility/apiCaller";
import OfferTile from "../../PersonalDetails/components/OfferTile";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { TRACK_ID } from "../../../utility/enum";
import { setUserClickData } from "../../../utility/setUserClickData";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { getAllianceLeadFromMoneyTapInput, sourceConvert } from "../../../utility/commonUtils";

const OfferSearchPage = ({ pancard, offerSearchData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [show, setShow] = useState(false);
  const [offers, setOffers] = useState([]);
  const [leadId, setLeadId] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [utmSource, setUtmSource] = useState("");
  const [affId, setAffId] = useState("");
  const [source, setSource] = useState("");
  const [params] = useSearchParams();
  const [activeLenders, setActiveLenders] = useState([]);

  const user = useSelector((state) => state.app.user);
  const personalDetails = useSelector((state) => state.app.personalDetails);
  const workDetails = useSelector((state) => state.app.workDetails);
  const panDetails = useSelector((state) => state.app.panDetails);
  const isLenderCheckCalled = useRef(false); 
  const isSubmitLeadCalled = useRef(false); 
  const mobileNumber = user?.contact_phone || "unknown";

  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
    if (params.get("utm_source")) setUtmSource(params.get("utm_source"));
    if (params.get("aff_id")) setAffId(params.get("aff_id"));
  }, [params]);

  useEffect(() => {
    if (!isLenderCheckCalled.current) {
      fetchLenderFirstCheck();
    }
  }, []);

  useEffect(() => {
    if (leadId) {
      const timer = setInterval(() => {
        fetchOffers(leadId);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [leadId]);

  const createLenderFirstCheckPayload = () => ({
    ...offerSearchData,
    contact_name: `${personalDetails?.firstName || ""} ${
      personalDetails?.lastName || ""
    }`.trim(),
    contact_phone: user?.contact_phone || "",
    pancard: panDetails?.pancard || pancard || "",
    profession_type: workDetails?.professionType || "",
    gender: personalDetails?.gender || "",
    dob: moment(personalDetails?.dob, "DD/MM/YYYY").toISOString(),
    pincode: personalDetails?.pincode || "",
    company_name: workDetails?.companyName || "",
    monthly_income: workDetails?.monthlyIncome || "",
    contact_email: personalDetails?.email || "",
    ckyc_consent: workDetails?.ckyc_consent || "",
  });

  const fetchLenderFirstCheck = async () => {
    if (isLenderCheckCalled.current) return;
    isLenderCheckCalled.current = true;

    const payload = createLenderFirstCheckPayload();

    try {
      setIsLoading(true);

      const response = await callApi(
        `v1/lender/lender-first-check`,
        "post",
        payload,
        "loan"
      );

      if (response.status === "Success" && response.data?.status === true) {
        const lenderOffer = response.data;

        const normalizedOffer = {
          contact_name: lenderOffer.contact_name,
          app_url: lenderOffer.app_url,
          credit_limit: lenderOffer.offers[0]?.credit_limit,
          emi: lenderOffer.offers[0]?.emi,
          tenure: lenderOffer.offers[0]?.tenure,
          logo_image_url: lenderOffer.offers[0]?.logo_image_url || "",
        };

        if (lenderOffer.offers[0]?.lender_id === "662752eb65fdba1a48d6e478") {
          normalizedOffer.logo_image_url = "https://digitmoney.in/image/prefr.png";
        }

        console.log("Normalized Offer:", normalizedOffer);
        setOffers([normalizedOffer]);
        setIsFinished(true);
        setIsLoading(false);
      } else {
        console.error("No valid offers found from lender-first-check.");
        submitLead();
      }
    } catch (error) {
      console.error("Error in lender-first-check:", error);
      submitLead();
    }
  };

  const submitLead = async () => {
    if (isSubmitLeadCalled.current) return;
    isSubmitLeadCalled.current = true;

    setUserClickData({
      event_name: `preapprove-website-lead-api-call-for-${mobileNumber || "unknown"}`,
    });

    try {
      const trackId = localStorage.getItem(TRACK_ID);
      const processedLead = getAllianceLeadFromMoneyTapInput("website", {
        ...user,
        ...personalDetails,
        ...workDetails,
        pancard: panDetails?.pancard || pancard || "",
        dob: moment(personalDetails?.dob, "DD/MM/YYYY").toISOString(),
        profession: workDetails.professionType,
      });

      const payload = {
        lead: {
          ...processedLead,
          tracking_id: trackId,
          aff_id: affId,
          utm_source: utmSource,
          utm_medium: sourceConvert(source),
        },
      };

      const res = await callApi(
        "v1/lead/website-lead",
        "post",
        payload,
        "core",
        user.token
      );

      if (res.status === "Success" && res.data.lead) {
        setLeadId(res.data.lead._id);
        fetchOffers(res.data.lead._id);
      } else {
        console.error("Failed to create lead");
        toast("Failed to create lead", { hideProgressBar: true, type: "error" });
      }
    } catch (err) {
      toast("Some error occurred while submitting the lead", {
        hideProgressBar: true,
        type: "error",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActiveLenders = async () => {
    try {
      const res = await callApi(
        `v1/lender/active-lenders`,
        "get",
        {},
        "loan"
      );
      if (res.status === "Success") {
        setActiveLenders(res.data.lenderList ?? []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOffers = async (leadId) => {
    if (isFinished) return;

    try {
      setIsFetching(true);
      const res = await callApi(
        `v1/loan_offer/lead_id/${leadId}`,
        "get",
        {},
        "core",
        user.token
      );

      if (res.status === "Success") {
        const { offers, lead } = res.data;

        if (offers?.length > 0) {
          let filteredOffers = offers;

          filteredOffers = activeLenders.length
          ? filteredOffers.filter((offer) =>
              activeLenders.some((lender) => lender._id === offer.lender_id)
            )
          : filteredOffers;

          filteredOffers = filteredOffers.map((offer) => {
            if (!offer.logo_image_url) {
              const matchingLender = activeLenders.find(
                (lender) => lender._id === offer.lender_id
              );
              if (matchingLender) {
                offer.logo_image_url = matchingLender.logo_image_url || "";
              }
            }
            // console.log("Processed Offer:", offer);
            if (offer.lender_id === "662752eb65fdba1a48d6e478") {
              offer.logo_image_url = "https://digitmoney.in/image/prefr.png";
            }

            return offer;
          });

          const uniqueOffers = filteredOffers.reduce((acc, offer) => {
            if (!acc.some((o) => o.lender_id === offer.lender_id)) {
              acc.push(offer);
            }
            return acc;
          }, []);
          // console.log("Unique Offers:", uniqueOffers);
          setOffers(uniqueOffers);
        } else {
          console.log("No offers found for this lead.");
          setOffers([]);
        }
        setIsFinished(
          res.data.lead?.all_responses === res.data.lead?.total_response
        );
      } else {
        console.error("No offers found in loan-offer API.");
        setOffers([]);
      }
    } catch (err) {
      console.error("Error fetching offers:", err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchActiveLenders();
  }, []);

  useEffect(() => {
    if (activeLenders.length > 0 && leadId) {
      fetchOffers(leadId);
    }
  }, [activeLenders, leadId]);

  const handleShowMore = () => {
    setShow(true);
    setUserClickData({ event_name: "view-more" });
  };

  return (
    <div className={"form-signin-apply form-signin"}>
      <HeadBar />
      <Stepper
        steps={["Personal Details", "Work Details", "Offer Page"]}
        currentStep={2}
      />

      {!isFinished && offers.length === 0 && (
        <div className="mb-4 font-normal text-center">
          Please wait while we are searching best offers for you
          <span className="ml-2 dot-pulse"></span>
          <div className="flex justify-center items-center">
            <img
              className="mt-20 img logo-img w-50 h-50"
              src="/assets/img/Design_last_page.png"
              alt="Loading Logo"
            />
          </div>
        </div>
      )}

      {isFinished && offers.length === 0 && (
        <div className="mb-4 font-normal text-center">
          No offers found for your profile at the moment.
        </div>
      )}

      {offers.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <h3 className="mt-8 text-lg text-center">
            Congratulations{" "}
            <span className="text-2xl font-normal">
              {personalDetails?.firstName || "Dear Customer"}!!
            </span>
          </h3>
          <h3 className="text-lg text-center">Your pre-approved offers</h3>

          {[...offers]
            .slice(0, 1)
            .map((offer) => (
              <div key={offer._id} className="my-4">
                <OfferTile small={false} offer={offer} />
              </div>
            ))}

          <div
            className={
              "grid gap-4" +
              (offers.length === 2
                ? " grid-cols-1"
                : offers.length === 3
                ? " grid-cols-2"
                : " grid-cols-3")
            }
          >
            {[...offers]
              .slice(1, show ? offers.length : 4)
              .map((offer) => (
                <div key={offer._id} className="">
                  <OfferTile small offer={offer} />
                </div>
              ))}
          </div>

          {offers.length > 4 && !show && (
            <FormButton onClick={handleShowMore} className="!mt-12 !w-40">
              View more
            </FormButton>
          )}
        </div>
      )}
    </div>
  );
};

export default OfferSearchPage;
