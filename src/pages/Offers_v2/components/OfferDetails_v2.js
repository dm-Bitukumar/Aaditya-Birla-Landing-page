import React, { useEffect, useState } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import FormButton from "../../../components/Buttons/FormButton";
import { useDispatch, useSelector } from "react-redux";
import { setLead, setOffers } from "../../../store/app/appReducer";
import callApi from "../../../utility/apiCaller";
import OfferTile from "../../PersonalDetails/components/OfferTile";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { setUserClickData } from "../../../utility/setUserClickData";

const OfferDetails_v2 = () => {
  const dispatch = useDispatch();   
  const lead = useSelector((state) => state.app.lead); 
  const user = useSelector((state) => state.app.user); 
  const offers = useSelector((state) => state.app.offers); 
  const [isFinished, setIsFinished] = useState(false); 
  const [leadId, setLeadId] = useState(null); 
  const [params] = useSearchParams(); 
  const [source, setSource] = useState("");
  const [affId, setAffId] = useState("");
  const [hasSubmittedLead, setHasSubmittedLead] = useState(false);

  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
    if (params.get("aff_id")) setAffId(params.get("aff_id"));
  }, [params]);

  useEffect(() => {
    if (!leadId && lead?._id && !hasSubmittedLead) {
      submitLead();
      setHasSubmittedLead(true);
    }
  }, [lead, leadId]);
  
  useEffect(() => {
    if (leadId) {
        console.log("Calling fetchOffers immediately for leadId:", leadId);
        fetchOffers();
    
        const timer = setInterval(() => {
          if (!isFinished) {
            console.log("Polling: Calling fetchOffers for leadId:", leadId);
            fetchOffers(); 
          }
        }, 5000);
    
        return () => {
          console.log("Clearing polling mechanism");
          clearInterval(timer);
        };
      }
  }, [leadId, isFinished]);

  const submitLead = async () => {
    setUserClickData({
      event_name: "personal-detail-api",
    });

    try {

      const res = await callApi(
        "v1/lead/process-lead-for-loan-v2",
        "post",
        {
          contact_phone: user.phone_number, 
          kyc_consent: true, 
          ip_address: "",
        },
        "core",
        user.token 
      );

      if (res.status === "Success" && res.data.lead) {
        setLeadId(res.data.lead._id); 
        dispatch(setLead(res.data.lead)); 
      }
    } catch (err) {
        console.error("Error in process-lead-for-loan-v2 API:", err);
        toast("Failed to process lead. Please try again.", {
            hideProgressBar: true,
            type: "error",
      });
      console.error(err);
    }
  };

  const fetchOffers = async () => {
    if (isFinished) return;

    try {
      const res = await callApi(
        `v1/loan_offer/lead_id/${leadId}`,
        "get",
        {},
        "core",
        user.token 
      );

      if (res.status === "Success") {
        dispatch(setOffers(res.data.offers ?? [])); 

        if (res.data.lead?.all_responses && res.data.lead?.total_response) {
            const allFetched = res.data.lead.all_responses === res.data.lead.total_response;
            setIsFinished(allFetched); 
        } else if (res.data.offers?.length === 0) {
            console.log("No offers available for this leadId. Stopping polling.");
            setIsFinished(true); 
          }
      }
    } catch (err) {
        console.error("Error in loan_offer API:", err);
      toast("Failed to fetch offers. Please try again.", {
        hideProgressBar: true,
        type: "error",
      });
      console.error(err);
    }
  };

  const handleShowMore = () => {
    setUserClickData({ event_name: "view-more" });
  };

  return (
    <div className={"form-signin-apply form-signin"}>
      <HeadBar />

      {!isFinished && offers?.length === 0 && (
        <div className="mb-4 font-normal text-center">
          Please wait while we are searching best offers for you
          <span className="ml-2 dot-pulse"></span>
        </div>
      )}

      {isFinished && offers?.length === 0 && (
        <div className="mb-4 font-normal text-center">
          There is no offer for you currently.
        </div>
      )}

      {offers?.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <img src="/assets/img/Dm LOGO.png" />

          <h3 className="mt-8 text-lg text-center">
            Congratulations{" "}
            <span className="text-2xl font-normal">{lead?.contact_name || "Dear Customer"}!!</span>
          </h3>
          <h3 className="text-lg">Your pre-approved offers </h3>

          {offers.length > 1 && (
            <div className="px-10 py-1 mt-4 text-xs font-semibold bg-gray-300 rounded">
              RECOMMENDED
            </div>
          )}
          {[...offers]
            .sort((a, b) => parseInt(a.priority) - parseInt(b.priority))
            .slice(0, 1)
            .map((e) => (
              <div key={e._id} className="my-4">
                <OfferTile small={false} offer={e} />
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
              .sort((a, b) => parseInt(a.priority) - parseInt(b.priority))
              .slice(1, 4)
              .map((e) => (
                <div key={e._id}>
                  <OfferTile small offer={e} />
                </div>
              ))}
          </div>

          {offers.length > 4 && (
            <div>
              <FormButton onClick={handleShowMore} className="!mt-12 !w-40">
                View more
              </FormButton>
            </div>
          )}

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

export default OfferDetails_v2;
