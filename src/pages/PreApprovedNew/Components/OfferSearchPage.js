import React, { useEffect, useState } from "react";
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

const OfferSearchPage = ({ pancard, offerSearchData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [show, setShow] = useState(false);
  const [offers, setOffers] = useState([]);
  const [leadId, setLeadId] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const user = useSelector((state) => state.app.user);
  const personalDetails = useSelector((state) => state.app.personalDetails);
  const workDetails = useSelector((state) => state.app.workDetails);
  const panDetails = useSelector((state) => state.app.panDetails);

  useEffect(() => {
    fetchLenderFirstCheck();
  }, []);

  useEffect(() => {
    if (leadId && !isFetching) {
      const timer = setInterval(() => {
        fetchOffers(leadId);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [leadId, isFetching]);

  const createLenderFirstCheckPayload = () => ({
    ...offerSearchData,
    contact_name: `${personalDetails?.firstName || ""} ${
      personalDetails?.lastName || ""
    }`.trim(),
    contact_phone: user?.contact_phone || "",
    // contact_phone: "9820956927",
    pancard: panDetails?.pancard || pancard || "",
    profession_type: workDetails?.professionType || "",
    gender: personalDetails?.gender || "",
    dob: moment(personalDetails?.dob, "DD/MM/YYYY").toISOString(),
    pincode: personalDetails?.pincode || "",
    company_name: workDetails?.companyName || "",
    monthly_income: workDetails?.monthlyIncome || "",
    contact_email: personalDetails?.email || "",
  });

  // Create payload for submitLead API
  const createSubmitLeadPayload = (trackingId) => ({
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
    tracking_id: trackingId,
  });

  const fetchLenderFirstCheck = async () => {
    const payload = createLenderFirstCheckPayload();

    try {
      setIsLoading(true);
      console.log("Payload for lender-first-check:", payload);

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
          // ...lenderOffer,
        };
        
        setOffers([normalizedOffer]);
        setIsFinished(true);
        setIsLoading(false);
        console.log("Offers from lender-first-check:", normalizedOffer);
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
    setUserClickData({
      event_name: "personal-detail-api",
    });

    try {
      const trackId = localStorage.getItem(TRACK_ID);
      const payload = createSubmitLeadPayload(trackId);

      // const leadPayload = {
      //   ...payload,
      //   tracking_id: trackId,
      // };

      console.log("Payload for website-lead:", payload);

      const res = await callApi(
        "v1/lead/website-lead",
        "post",
        {
          lead: payload,
        },
        "core",
        user.token
      );

      console.log("Response from website-lead:", res);

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

  const fetchOffers = async (leadId) => {
    if (isFinished || !leadId) return;

    try {
      setIsFetching(true);
      console.log("Fetching offers for lead ID:", leadId);

      const res = await callApi(
        `v1/loan_offer/lead_id/${leadId}`,
        "get",
        {},
        "core",
        user.token
      );

      if (res.status === "Success" && res.data?.offers?.length > 0) {
        setOffers(res.data.offers);
        setIsFinished(true);
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

  const handleShowMore = () => setShow(true);

  return (
    <div className={"form-signin-apply form-signin"}>
      <HeadBar />
      <Stepper steps={["Personal Details", "Work Details", "Offer Page"]} currentStep={2} />

      {!isLoading && offers?.length === 0 && (
        <div className="mb-4 font-normal text-center">
          Please wait while we are searching best offers for you
          <span class="ml-2 dot-pulse"></span>
        </div>
      )}

      {!isFinished && offers.length === 0 && (
        <div className="mb-4 font-normal text-center">
          No offers found for your profile at the moment.
        </div>
      )}

      {offers.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <h3 className="mt-8 text-lg text-center">
            Congratulations{" "}
            <span className="text-2xl font-normal">{personalDetails?.firstName || "Dear Customer"}!!</span>
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
