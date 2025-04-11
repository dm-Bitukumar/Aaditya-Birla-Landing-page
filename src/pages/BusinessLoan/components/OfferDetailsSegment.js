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
  const callCenterApiCalledRef = useRef(false);
  const callCountRef = useRef(0);
  const [hasTriggeredCallCenterApi, setHasTriggeredCallCenterApi] =
    useState(false);

  console.log("Formdata:", formData);

  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
  }, [params]);

  useEffect(() => {
    console.log("Stage 4:", formData.is_stage4_completed);
    if (leadId && formData.is_stage4_completed === false) {
      console.log("Calling business-lead api for the first time");
      submitLead();
    } else {
      console.log("Skipping business-lead api");
    }
  }, [leadId, formData.is_stage4_completed]);

  useEffect(() => {
    if (!leadId) return;
    const intervalId = setInterval(async () => {
      console.log(`Call count before fetchOffers: ${callCountRef.current}`);
      if (callCountRef.current < 3) {
        await fetchOffers();
        callCountRef.current += 1;
      } else {
        clearInterval(intervalId);
        if (
          !icanApiCalledRef.current &&
          formData.is_stage4_completed === false
        ) {
          console.log("Triggering ican API");
          icanApiCalledRef.current = true;
          try {
            await callApi(
              "v1/ican_api/bl-data-send-with-offers-to-ican_for_update",
              "post",
              {
                lead_id: leadId,
                is_document_upload: "",
              },
              "core"
            );
          } catch (err) {
            console.error("ican API Call Failed:", err);
          }
        }
        console.log(
          hasTriggeredCallCenterApi,
          offers.length,
          formData.is_stage4_completed
        );
        if (
          !hasTriggeredCallCenterApi &&
          offers.length > 0 &&
          formData.is_stage4_completed === false
        ) {
          setHasTriggeredCallCenterApi(true);
          triggerCallCenterApi();
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [leadId, offers]);

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
    if (!leadId) {
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

        setLeadName(res.data.lead?.contact_name ?? "Customer");
        console.log("Fetched lead name:", res.data.lead?.contact_name);
      } else {
        console.warn("Offer API did not return success:", res);
      }
    } catch (err) {
      console.error("fetchOffers API Call Failed:", err);
    }
  };

  const triggerCallCenterApi = async () => {
    try {
      console.log("triggerCallCenterApi");

      const leadDetailsResponse = await callApi(
        "v1/lead/list",
        "post",
        {
          filters: { _id: leadId },
        },
        "core"
      );

      if (
        leadDetailsResponse.status === "Success" &&
        Array.isArray(leadDetailsResponse.data?.leadList) &&
        leadDetailsResponse.data.leadList.length > 0
      ) {
        const leadDetails = leadDetailsResponse.data.leadList[0];

        const bankStatements = leadDetails.bank_statement_file || [];
        const bank_statementOne =
          bankStatements.length > 0 ? bankStatements[0] : "";
        const bank_statementTwo =
          bankStatements.length > 1 ? bankStatements[1] : "";
        const bank_statementThree =
          bankStatements.length > 2 ? bankStatements[2] : "";

        const payload = {
          leadid: leadDetails._id || "",
          name: leadDetails.contact_name || "",
          phonenumber: leadDetails.contact_phone || "",
          pan: leadDetails.pancard || "",
          email: leadDetails.contact_email || "",
          dob: leadDetails.dob ? leadDetails.dob.split("T")[0] : "",
          residence_pincode: leadDetails.pincode || "",
          residence_type: leadDetails.residence_type || "",
          gst_number: leadDetails.gst || "",
          udyam_number: leadDetails.udyamno || "",
          annual_turnover: leadDetails.annual_turnover || "",
          industry: leadDetails.industry || "",
          business_address: leadDetails.work_address1 || "",
          address_type: leadDetails.business_type || "",
          company_type: leadDetails.ownership || "",
          bank_statementOne,
          bank_statementTwo,
          bank_statementThree,
          electricity_bill: leadDetails.electricity_bill_file?.[0] || "",
          gst_certificate: leadDetails.gst_certificate_file || "",
          pan_card: leadDetails.pan_card_file || "",
          aadhar_card: leadDetails.aadhar_card_file || "",
        };

        console.log("📨 Sending data to Call Center API:", payload);

        const callCenterApiResponse = await axios.post(
          "https://api.digitmoney.in/new-api/callcenter-bl.php",
          payload
        );

        console.log("Call Center API Response:", callCenterApiResponse.data);

        if (callCenterApiResponse.status === 200) {
          console.log("Call Center API triggered successfully");
        } else {
          console.log(callCenterApiResponse.status);
          callCenterApiCalledRef.current = false;
        }
      } else {
        console.warn("Lead details not found for Call Center API");
        callCenterApiCalledRef.current = false;
      }
    } catch (err) {
      console.error("Call Center API Call Failed:", err);
      callCenterApiCalledRef.current = false;
    }
  };

  const handelShow = () => {
    setShow(true);
    setUserClickData({ event_name: "view-more" });
  };

  useEffect(() => {
    if (isFinished && offers?.length === 0) {
      (async () => {
        try {
          console.log("📨 Triggering ican API due to no offers condition");
          await callApi(
            "v1/ican_api/bl-data-send-with-offers-to-ican_for_update",
            "post",
            {
              lead_id: leadId,
              is_document_upload: "Yes",
            },
            "core"
          );
        } catch (err) {
          console.error("ican API (No Offers) Call Failed:", err);
        }
      })();
    }
  }, [isFinished, offers]);

  return (
    <div className={"form-signin-apply form-signin"}>
      <HeadBar />
      {/* <Stepper
        steps={["Personal Details", "Work Details", "Offer Page"]}
        currentStep={2}
      /> */}
      <img src="/assets/img/Dm LOGO.png" className="mt-8 mx-auto" />

      {/* {!isFinished && offers?.length === 0 && (
        <div className="mb-4 mt-4 font-normal text-center">
          Please wait while we are searching best offers for you
          <span className="ml-2 dot-pulse"></span>
        </div>
      )} */}
      {((formData.is_stage4_completed === false && callCountRef.current < 3) ||
        ((formData.is_stage4_completed === true ||
          formData.is_stage4_completed === undefined) &&
          offers?.length === 0)) && (
        <div className="mb-4 mt-4 font-normal text-center">
          Please wait while we are searching offers for you
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
