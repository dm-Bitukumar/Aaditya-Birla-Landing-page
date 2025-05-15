import React from "react";
import "./OffersPage.css";
import { setUserClickData } from "../../../../../utility/setUserClickData";
import { useSearchParams } from "react-router-dom";
import { setOffers } from "../../../../../store/app/appReducer";
import { useState } from "react";
import callApi from "../../../../../utility/apiCaller";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import _ from "lodash";

const OfferCard = ({ offer, isExpanded, onExpand }) => {
  const [showDefaultOfferPopup, setShowDefaultOfferPopup] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const user = useSelector((state) => state.app.user);
  const dispatch = useDispatch();
  console.log("user", user);
  const navigate = useNavigate();
  const source = "";
  const token =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE3MWI1MTU1MmI0ODA5OWNkMGFkN2Y5YmZlNGViODZiMDM5NmUxZDEiLCJ0eXAiOiJKV1QifQ.eyJhcHBUeXBlIjoiYXBpX2RpZ2l0bW9uZXkiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20va3JlZGl0YmVlLXN0YWdlIiwiYXVkIjoia3JlZGl0YmVlLXN0YWdlIiwiYXV0aF90aW1lIjoxNzM1NTU5NDM2LCJ1c2VyX2lkIjoiSVhJbmFCSUVtaVFiVlU5Zk12dzY4SzF5MkVyMiIsInN1YiI6IklYSW5hQklFbWlRYlZVOWZNdnc2OEsxeTJFcjIiLCJpYXQiOjE3MzU1NTk0MzYsImV4cCI6MTczNTU2MzAzNiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6e30sInNpZ25faW5fcHJvdmlkZXIiOiJjdXN0b20ifX0.CigNktWiBhNvgi6pUV9MyKD4eh2AOTtNrn2w54dlORNo2IyhfVAPCJhRT22ZdTdoF-9DldsotvosO8nmlPBfDiUV38JeXO3BxbwBTro-iOt-jdMj_qKm9H86zRrMFjLeQ2Vshgxh6UrVVw3xIMOXE7dTqCssMTG1qBYMBwtQSgGhEXhUxsg6IXADk014VjG-l41mzYPMCxnJjy7ffXszB5h2AfHzP6jdAU2IvhXLMCVw38KjTwLs0id6WbqKMqyyB04R40KVofXkk-1rn3QqO2lSMX8wHhXWSkpe_OQbKbn5gNV7ac8_Kw7MtpGohBdkm9l9N9t6v7VbVDuGBsiv2Q";
  const { _id: leadId, contact_phone: mobile } = useSelector(
    (state) => state.app.lead
  );
  const [params] = useSearchParams();

  const handleClick = () => {
    setUserClickData({
      event_name: `offer-apply-button-default-${offer.lender_name}`,
      user_id: offer.lead_id || "No User ID found",
      affiliate_id: params.get("aff_id") || "No Aff_id found",
    });
    setUserClickData({
      event_name: `offer-apply-default-button`,
      user_id: offer.lead_id || "No User ID found",
      affiliate_id: params.get("aff_id") || "No Aff_id found",
    });
    console.log(`offer.isdefault:${offer.isdefault}`);
    if (offer.isdefault === true) {
      setShowDefaultOfferPopup(true);
    } else {
      window.location.href = `${offer.app_url}`;
    }
  };

  const proceedWithOffer = async () => {
    setUserClickData({
      event_name: "submit-lead-check-offer-loan-page",
      user_id: leadId || "No User ID found here",
      affiliate_id: params.get("aff_id") || "No Aff_id found",
    });
    try {
      const leadResponse = await callApi(
        "v1/lead/lead-from-phone-nt",
        "post",
        {
          phone: mobile,
          website_kyc_consent: isAuthorized,
          website_kyc_consent_datetime: new Date().toISOString(),
        },
        "core",
        token
      );

      if (leadResponse["status"] === "Success" && leadResponse.data.lead) {
        const leadData = leadResponse.data.lead;

        const ltResponse = await callApi(
          "v1/lender_api_call/list",
          "post",
          {
            filters: {
              lead_id: leadData._id,
              lender_name: "L&T",
            },
            pageSize: 10,
            pageNum: 1,
          },
          "loan_service"
        );

        const coreLeadCheck = await callApi(
          "v1/lead/list",
          "post",
          {
            filters: {
              _id: leadData._id,
            },
          },
          "core"
        );

        const foundLead = coreLeadCheck?.data?.leadList?.[0];
        console.log(
          "foundLead",
          foundLead?._id,
          foundLead?.is_landt_finbud_success
        );
        if (ltResponse?.data?.lender_api_callCount > 0) {
          if (foundLead?.is_landt_finbud_success === true) {
            await fetchOffers(leadData._id);
          }
        } else {
          if (foundLead?.is_landt_finbud_success === true) {
            console.log("Calling bulk-lead-push-by-leadId", {
              leads: [{ lead_id: leadData._id }],
              lender_name: "L&T",
              lender_id: "662752eb65fdba1a48d6e482",
            });
            await callApi(
              "v1/lead/bulk-lead-push-by-leadId-nt",
              "post",
              {
                leads: [{ lead_id: leadData._id }],
                lender_name: "L&T",
                lender_id: "662752eb65fdba1a48d6e482",
              },
              "core",
              token
            );
            await fetchOffers(leadData._id);
          }
        }

        //await fetchOffers(leadData._id);
        // navigate(`/offers?lid=${leadData._id}&source=${source}`);
      } else {
        navigate(`/personal-loan?source=${source}`);
      }
    } catch (error) {
      console.log("Error fetching lead or calling APIs:", error);
      //setIsFinished(true);
      navigate(`/personal-loan?source=${source}`);
    }
  };

  const fetchOffers = async (leadId) => {
    if (!leadId || isFinished) return false;

    try {
      const [offerRes, lenderRes] = await Promise.all([
        callApi(`v1/loan_offer/lead_id/${leadId}`, "get", {}, "core"),
        callApi(`v1/lender/active-lenders`, "get", {}, "loan"),
      ]);

      if (
        offerRes.status === "Success" &&
        offerRes.data?.offers?.length > 0 &&
        lenderRes.status === "Success"
      ) {
        const offers = offerRes.data.offers;
        const apiLenders = lenderRes.data.lenderList ?? [];

        const hardcodedLender = {
          _id: "662752eb65fdba1a48d6e482",
          lender_name: "L&T",
        };
        const mergedLenders = [...apiLenders, hardcodedLender];

        const sortedOffers = _.orderBy(offers, ["priority"], ["asc"]);
        const filteredOffers = sortedOffers.filter((offer) =>
          mergedLenders.some((lender) => lender._id === offer.lender_id)
        );
        const prioritizedOffers = filteredOffers.sort((a, b) => {
          if (a.lender_id === hardcodedLender._id) return -1;
          if (b.lender_id === hardcodedLender._id) return 1;
          return 0;
        });

        dispatch(setOffers(prioritizedOffers));

        setIsFinished(true);
        return true;
      } else {
        setIsFinished(true);
        //navigate(`/offer-page-v3?lid=${leadId}`);
        //dispatch(setOffers([]));
        return false;
      }
    } catch (err) {
      console.error("Error in offer fetching", err);
      toast.error("Something went wrong while fetching offers.");
      setIsFinished(true);
      return false;
    }
  };

  const isLNT = offer.lender_id === "662752eb65fdba1a48d6e482";
  const horizontalLogo = isLNT
    ? "https://digitmoney.in/image/partners/lnt.png"
    : offer.banking_partners_hl || offer.logo_image_url;

  const verticalLogo = isLNT
    ? "https://digitmoney.in/image/partners/lnt.png"
    : offer.banking_partners_vl || offer.logo_image_url;

  return (
    <>
      {showDefaultOfferPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Do you want to proceed with L&T for a personal loan?
            </h2>

            <div className="flex items-start mb-4">
              <input
                type="checkbox"
                id="authorizeCheckbox"
                className="mt-1 mr-2"
                checked={isAuthorized}
                onChange={(e) => setIsAuthorized(e.target.checked)}
              />
              <label htmlFor="authorizeCheckbox" className="text-gray-700">
                You authorize us to share your details with L&T to obtain your
                credit information for generating the loan offer.
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowDefaultOfferPopup(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded text-white ${
                  isAuthorized
                    ? "bg-blue-600"
                    : "bg-blue-300 cursor-not-allowed"
                }`}
                disabled={!isAuthorized}
                onClick={() => {
                  setShowDefaultOfferPopup(false);
                  proceedWithOffer();
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="offer-card-section">
        <div
          className={`offer-card ${isExpanded ? "expanded" : "collapsed"}`}
          onClick={onExpand}
        >
          {isExpanded && (
            <>
              <img src={horizontalLogo} className="lender-logo" alt="Lender" />
            </>
          )}

          <div className="offer-details">
            {isExpanded && <hr className="offer-divider" />}

            {isExpanded ? (
              <>
                <div className="amount-row">
                  <span className="amount-label">
                    {[
                      "662752eb65fdba1a48d6e466",
                      "666ec1953a9a969d8f9980f1",
                      "67762d497ae263a3ec86347e",
                      "6799b8fada60414f0f195bf9",
                      "67bd3abe694463207380f33d",
                      "67be8fc6049b9a4e3af8191a",
                      "67e23d6fe162ba8f717ec5bf",
                      "67ef646df80610d286084e60",
                    ].includes(offer.lender_id)
                      ? "Max Loan Amount:"
                      : "Pre-Approved Amount:"}
                  </span>
                  <span className="amount-value">
                    {offer.isdefault ? "Upto " : ""} ₹
                    {Number(offer.credit_limit).toLocaleString("en-IN")}
                  </span>
                </div>
              </>
            ) : (
              <div className="amount-row">
                <img src={verticalLogo} className="lender-logo" alt="Lender" />
                <div>
                  <span className="amount-label">
                    {[
                      "662752eb65fdba1a48d6e466",
                      "666ec1953a9a969d8f9980f1",
                      "67762d497ae263a3ec86347e",
                      "6799b8fada60414f0f195bf9",
                      "67bd3abe694463207380f33d",
                      "67be8fc6049b9a4e3af8191a",
                      "67e23d6fe162ba8f717ec5bf",
                      "67ef646df80610d286084e60",
                    ].includes(offer.lender_id)
                      ? "Max Loan Amount:"
                      : "Pre-Approved Amount:"}
                  </span>
                  <br />
                  <span className="amount-value">
                    {offer.isdefault ? "Upto " : ""} ₹
                    {Number(offer.credit_limit).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            )}

            {isExpanded && <hr className="offer-divider" />}
            {isExpanded && (
              <>
                {!offer.isdefault && (
                  <div className="emi-row">
                    <span className="tenure">
                      Tenure: {offer.tenure} Months
                    </span>
                    <span className="vertical-divide">|</span>
                    <span className="emi">
                      EMI: ₹{Number(offer.emi).toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                <button
                  className="get-offer-btn tracking-get-offer-btn-v5"
                  // id={`btn-get-offer-${
                  //   offer.lender_name?.toLowerCase().replace(/\s+/g, "-") ||
                  //   "unknown"
                  // }-v5`}
                  id={`btn-get-offer-v5`}
                  onClick={handleClick}
                >
                  {" "}
                  Get Offer{" "}
                  <img
                    src="/assets/img/Get offer CTA icon.svg"
                    alt="Arrow"
                    className="cta-icon"
                  />
                </button>
              </>
            )}
          </div>

          {!isExpanded && (
            <img
              src="/assets/img/offers arrow.svg"
              className="collapse-arrow"
              alt="Expand"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default OfferCard;
