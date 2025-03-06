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
import axios from "axios";

const OfferDetailsSegment = ({ formData: initialFormData }) => {
  const location = useLocation();
  const formData = location.state || initialFormData || {};
  const dispatch = useDispatch();
  const lead = useSelector((state) => state.app.lead);
  const user = useSelector((state) => state.app.user);
  const offers = useSelector((state) => state.app.offers);
  const [isFinished, setIsFinished] = useState(false);
  const [coreLeadId, setCoreLeadId] = useState("");
  const [leadName, setLeadName] = useState("Customer");
  const [show, setShow] = useState(false);
  const [source, setSource] = useState("");
  const [params] = useSearchParams();
  const leadId = params.get("lid");
  const icanApiCalledRef = useRef(false);
  console.log("Formdata:", formData);
  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
  }, [params]);

  useEffect(() => {
    if (leadId && formData.is_stage4_completed === false) {
      console.log("Calling business-lead api for the first time");
      submitLead();
    } else {
      console.log("Skipping business-lead api");
    }
  }, [leadId, formData.is_stage4_completed]);

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

  // const submitLead = async () => {
  //   setUserClickData({ event_name: "business-loan-page" });

  //   try {
  //     console.log(`Skipping business-lead API`);

  //     const leadResponse = { status: "Success", data: "mock-lead-id-12345" };

  //     if (leadResponse.status === "Success" && leadResponse.data) {
  //       setCoreLeadId(leadResponse.data);
  //       const updateResponse = await callApi(
  //         "v1/businessloanlead/new",
  //         "post",
  //         {
  //           businessloanlead: {
  //             contact_phone: formData.mobile,
  //             contact_name: formData.full_name,
  //             pan_no: formData.pancard,
  //             is_stage4_completed: true,
  //           },
  //         },
  //         "core"
  //       );
  //       console.log(updateResponse);
  //       return leadResponse.data;
  //     } else {
  //       console.warn("Lead API did not return success:", leadResponse);
  //     }
  //   } catch (err) {
  //     console.error("API Call Failed:", err);
  //   }
  //   return null;
  // };

  const submitLead = async () => {
    setUserClickData({ event_name: "business-loan-page" });
    try {
      console.log(`Submitting Lead API for leadId: ${leadId}`);
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
        console.log("Updating businessloanlead with is_stage4_completed: true");

        const updateResponse = await callApi(
          "v1/businessloanlead/new",
          "post",
          {
            businessloanlead: {
              contact_phone: formData.mobile,
              contact_name: formData.full_name,
              pan_no: formData.pancard,
              is_stage4_completed: true,
            },
          },
          "core"
        );

        console.log("Update API Response:", updateResponse);
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
    console.log("fetchOffers() triggered");
    if (isFinished || !leadId) {
      return;
    }

    try {
      console.log(`Fetching offers for leadId: ${leadId}`);
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
              lead_id: leadId,
              is_document_upload: "",
            },
            "core"
          );
        }
        setLeadName(res.data.lead?.contact_name ?? "Customer");
        console.log("Fetched lead name:", res.data.lead?.contact_name);
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
      <img src="/assets/img/Dm LOGO.png" className="mt-8 mx-auto" />
      {!isFinished && offers?.length === 0 && (
        <div className="mb-4 mt-4 font-normal text-center">
          Please wait while we are searching best offers for you
          <span className="ml-2 dot-pulse"></span>
        </div>
      )}
      {isFinished && offers?.length === 0 && (
        <div className="mb-4 mt-4 font-normal text-center">
          There is no offer for you currently.
        </div>
      )}

      {offers?.length > 0 &&
        (() => {
          const filteredOffers = [];
          const seenLeadIds = new Set();

          offers.forEach((offer) => {
            if (!seenLeadIds.has(offer.lender_id)) {
              seenLeadIds.add(offer.lender_id);
              filteredOffers.push(offer);
            }
          });

          return (
            <div className="flex flex-col items-center justify-center">
              {/* <img src="/assets/img/Dm LOGO.png" className="mt-4" /> */}

              <h3 className="mt-8 text-lg text-center">
                Congratulations{" "}
                <span className="text-2xl font-normal">{leadName}!!</span>{" "}
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
