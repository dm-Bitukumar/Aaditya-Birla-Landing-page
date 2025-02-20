import React, { useEffect, useRef, useState } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import Stepper from "../../../components/Form/Stepper";
import FormButton from "../../../components/Buttons/FormButton";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setLead, setOffers } from "../../../store/app/appReducer";
import callApi from "../../../utility/apiCaller";
import OfferTile from "../../PersonalDetails/components/OfferTile";
import { toast } from "react-toastify";
import { setUserClickData } from "../../../utility/setUserClickData";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const OfferDetailsSegment = ({ formData: initialFormData }) => {
  const location = useLocation();
  const formData = location.state || initialFormData || {};
  const dispatch = useDispatch();
  const lead = useSelector((state) => state.app.lead);
  const user = useSelector((state) => state.app.user);
  const offers = useSelector((state) => state.app.offers);
  const [isFinished, setIsFinished] = useState(false);
  const [coreLeadId, setCoreLeadId] = useState("");
  const [show, setShow] = useState(false);
  const [source, setSource] = useState("");
  const [params] = useSearchParams();
  const leadId = params.get("lid");
  const icanApiCalledRef = useRef(false);

  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
  }, [params]);

  useEffect(() => {
    if (leadId) {
      submitLead();
    }
  }, [leadId]);

  useEffect(() => {
    if (!leadId) return;

    let callCount = 0;
    const intervalId = setInterval(() => {
      if (callCount < 2) {
        fetchOffers();
        callCount++;
      } else {
        clearInterval(intervalId);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [leadId]);

  const submitLead = async () => {
    setUserClickData({ event_name: "business-loan-page" });

    // if (formData.is_pan_mobile_verify_completed !== "true") {
    //   console.warn(
    //     "Skipping submitLead: PAN & Mobile verification not completed."
    //   );
    //   return;
    // }
    try {
      const leadResponse = await callApi(
        "v1/lead/business-lead",
        "post",
        { lead_id: leadId },
        "core",
        user.token
      );

      console.log("Lead API Response:", leadResponse);

      if (leadResponse.status === "Success" && leadResponse.data) {
        setCoreLeadId(leadResponse.data);
        return leadResponse.data;
      } else {
        console.warn("Lead API did not return success:", leadResponse);
      }
    } catch (err) {
      // toast("Some error occurred", { hideProgressBar: true, type: "error" });
      // console.error("API Call Failed:", err);
    }
    return null;
  };

  const fetchOffers = async () => {
    if (isFinished || !leadId) {
      return;
    }

    try {
      const res = await callApi(
        `v1/loan_offer/lead_id/${leadId}`,
        "get",
        {},
        "core"
      );

      if (res.status === "Success") {
        dispatch(setOffers(res.data.offers ?? []));
        if (res.data.lead?.all_responses) {
          setIsFinished(
            res.data.lead?.all_responses === res.data.lead?.total_response
          );
        }

        if (!icanApiCalledRef.current) {
          icanApiCalledRef.current = true;
          await callApi(
            "v1/ican_api/bl-data-send-with-offers-to-ican_for_update",
            "post",
            {
              lead: {
                lead_id: leadId,
                is_document_upload: "",
              },
            },
            "core"
          );
        }
      } else {
        console.warn("Offer API did not return success:", res);
      }
    } catch (err) {
      console.error("fetchOffers API Call Failed:", err);
    }
  };

  const handelShow = () => {
    setShow(true);
    setUserClickData({ event_name: "view-more" });
  };

  return (
    <div className={"form-signin-apply form-signin"}>
      <HeadBar />
      {/* <Stepper
        steps={["Personal Details", "Work Details", "Offer Page"]}
        currentStep={2}
      /> */}
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

      {offers?.length > 0 &&
        (() => {
          const filteredOffers = [];
          const seenLeadIds = new Set();

          offers.forEach((offer) => {
            if (!seenLeadIds.has(offer.lead_id)) {
              seenLeadIds.add(offer.lead_id);
              filteredOffers.push(offer);
            }
          });
          console.log("Filtered Offers:", filteredOffers);
          return (
            <div className="flex flex-col items-center justify-center">
              <img src="/assets/img/Dm LOGO.png" className="mt-4"/>

              <h3 className="mt-8 text-lg text-center">
                Congratulations{" "}
                <span className="text-2xl font-normal">
                  {lead.name || "Customer"}!!
                </span>{" "}
              </h3>
              <h3 className="text-lg">Your pre-approved offers </h3>

              {filteredOffers.length > 1 ? (
                <div className="px-10 py-1 mt-4 text-xs font-semibold bg-gray-300 rounded">
                  RECOMMENDED
                </div>
              ) : null}
              {[...filteredOffers]
                .sort((a, b) => parseInt(a.priority) - parseInt(b.priority))
                .slice(0, 1)
                .map((e) => (
                  <div key={e._id} className="my-4">
                    <OfferTile small={false} offer={e} source={source} />
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
                {[...filteredOffers]
                  .sort((a, b) => parseInt(a.priority) - parseInt(b.priority))
                  .slice(1, show ? 1000 : 4)
                  .map((e) => (
                    <div key={e._id} className="">
                      <OfferTile small offer={e} source={source} />
                    </div>
                  ))}
              </div>

              {filteredOffers.length > 4 && !show && (
                <div>
                  <FormButton onClick={handelShow} className="!mt-12 !w-40">
                    View more
                  </FormButton>
                </div>
              )}
              <h4 className="mt-4 text-xs text-center">
                *These pre-approved offers are subject to change at discretion
                of Bank / NBFC after receiving all your documents and details.
                Final offer will be based on risk policy of Bank / NBFC. We do
                not guarantee that final offer will be same as Pre-approved
                offer.
              </h4>
            </div>
          );
        })()}
    </div>
  );
};

export default OfferDetailsSegment;
