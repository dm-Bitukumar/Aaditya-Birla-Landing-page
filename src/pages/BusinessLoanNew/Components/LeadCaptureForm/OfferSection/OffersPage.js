import React, { useEffect, useState } from "react";
import "./OffersPage.css";
import { useSelector, useDispatch } from "react-redux";
import { setOffers } from "../../../../../store/app/appReducer";
import callApi from "../../../../../utility/apiCaller";
import { toast } from "react-toastify";
import {
  getAllianceLeadFromMoneyTapInput,
  sourceConvert,
} from "../../../../../utility/commonUtils";
import { setUserClickData } from "../../../../../utility/setUserClickData";
import OfferCard from "./OfferCard";
import { TRACK_ID } from "../../../../../utility/enum";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";
import FormInputStyle2 from "../../../../../components/Form/FormInputStyle2";
import FormButtonStyle2 from "../../../../../components/Form/FormButtonStyle2";
import { useNavigate } from "react-router";

const OfferPage = ({ formData, setFormData, setCurrentStep }) => {
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const lead = useSelector((state) => state.app.lead);
  const user = useSelector((state) => state.app.user);
  const offers = useSelector((state) => state.app.offers);
  const dispatch = useDispatch();
  const [isFinished, setIsFinished] = useState(true);
  const [isOffer, setisOffer] = useState([]);
  const [leadId, setLeadId] = useState();
  const [expandedOfferId, setExpandedOfferId] = useState(null);
  const [activeLenders, setActiveLenders] = useState([]);
  const [params] = useSearchParams();
  const [affId, setAffId] = useState("");
  const navigate = useNavigate();
  const [monthlyIncome, setMonthlyIncome] = useState(
    formData.monthlyIncome || ""
  );
  console.log("ID in offer upload: ", formData._id);

  useEffect(() => {
    try {
      const fetchAndSetOffers = async () => {
        const firstResult = await fetchOffers(formData._id);
        if (firstResult && firstResult.status === "Success") {
          if (firstResult.data.offers.length > 0) {
            const excludedLenders = [
              "Protium BL",
              "Poonawalla BL",
              "Niyogin",
              "Godrej",
            ];

            const filteredOffers = firstResult.data.offers.filter(
              (offer) =>
                !excludedLenders.some((lender) =>
                  offer.lender_name.includes(lender)
                )
            );
            if (filteredOffers.length > 0) {
              navigate(`/offer-page-v1?lid=${formData._id}`, {
                state: {
                  ...formData,
                  _id: formData._id,
                },
              });
            } else {
              setisOffer(firstResult.data.offers);
            }
          }
        }
      };

      fetchAndSetOffers();
    } catch (err) {
      toast("Some error occurred", { hideProgressBar: true, type: "error" });
      console.log(err);
    }
  }, [formData._id]);

  useEffect(() => {
    if (params.get("aff_id")) setAffId(params.get("aff_id"));
  }, [params]);
  const dummyOffers = [
    // {
    //   _id: "offer1",
    //   lender_name: "Bank A",
    //   interest_rate: "10%",
    //   loan_amount: "500,000",
    // },
    // {
    //   _id: "offer2",
    //   lender_name: "Bank B",
    //   interest_rate: "12%",
    //   loan_amount: "300,000",
    // },
  ];

  const validate = () => {
    const newErrors = {};

    if (!monthlyIncome.match(/^[\d,]+$/)) newErrors.monthlyIncome = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (params.get("aff_id")) setAffId(params.get("aff_id"));
  }, [params]);

  const handleContinue = async () => {
    if (!validate()) return;
    const plainMonthlyIncome = monthlyIncome.replace(/,/g, "");
    const updated = {
      monthlyIncome: plainMonthlyIncome,
    };

    setFormData((prev) => ({
      ...prev,
      ...updated,
    }));

    const payload = {
      businessloanlead: {
        contact_phone: formData.mobile,
        monthly_income: parseInt(plainMonthlyIncome),
        is_stage5_completed: "true",
      },
    };

    try {
      const leadCreateResponse = await callApi(
        "v1/businessloanlead/new-v1",
        "post",
        payload,
        "core"
      );

      if (leadCreateResponse.status === "Success") {
        toast.success("Data saved successfully.");
        setUserClickData({
          event_name: "step5-business-loan-page-v1-completed",
          user_id: formData.mobile || "unknown",
          affiliate_id: affId || "No Aff_id found",
        });

        const _leadId = leadCreateResponse.data.businessloanlead?.lead?._id;
        setLeadId(_leadId); // update state

        try {
          console.log(`Submitting Lead API for leadId: ${_leadId}`);
          const leadSubmitResponse = await callApi(
            "v1/lead/process-lead-for-loan-pl-fail-from-bl",
            "post",
            { lead_id: _leadId },
            "core",
            user.token
          );
          console.log("Lead API Response:", leadSubmitResponse);

          if (
            leadSubmitResponse.status === "Success" &&
            leadSubmitResponse.data
          ) {
            await callApi(
              "v1/businessloanlead/new-v1",
              "post",
              {
                businessloanlead: {
                  contact_phone: formData.mobile,
                  bl_pl_offer_found: true,
                },
              },
              "core"
            );
            navigate(`/offer-page-v1?lid=${_leadId}`, {
              state: {
                ...formData,
                _id: _leadId,
              },
            });
          } else {
            console.warn(
              "Lead API did not return success:",
              leadSubmitResponse
            );
          }
        } catch (err) {
          console.error("Second API Call Failed:", err.message || err);
        }
      } else {
        console.warn(
          "Failed to update business loan lead:",
          leadCreateResponse
        );
        toast.error("Failed to update data.");
      }
    } catch (err) {
      console.error("API Error:", err.message || err);
      toast.error("An error occurred while updating the data.");
    }
  };

  useEffect(() => {
    dispatch(setOffers(dummyOffers));
  }, [dispatch]);

  useEffect(() => {
    fetchActiveLenders();
    console.log(formData);
  }, []);

  useEffect(() => {
    const allValid = /^\d+$/.test(monthlyIncome.replace(/,/g, ""));

    setIsFormValid(allValid);
  }, [monthlyIncome]);

  useEffect(() => {
    if (formData.stepDone === 4) {
      console.log("offer page");
      console.log(offers);
      submitLead();
    }
  }, [formData]);

  useEffect(() => {
    if (offers.length > 0 && !expandedOfferId) {
      setExpandedOfferId(offers[0]._id);
    }
  }, [offers]);

  const fetchActiveLenders = async () => {
    try {
      const res = await callApi(`v1/lender/active-lenders`, "get", {}, "loan");
      if (res.status === "Success") {
        const apiLenders = res.data.lenderList ?? [];

        const hardcodedLender = {
          _id: "662752eb65fdba1a48d6e482",
          lender_name: "L&T",
        };

        const mergedLenders = [...apiLenders, hardcodedLender];

        setActiveLenders(mergedLenders);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const submitLead = async () => {
    try {
      const firstResult = await fetchOffers(formData.leadId);
      console.log(firstResult);
      if (firstResult && firstResult.status === "Success") {
        if (firstResult.data.offers.length > 0) {
          setisOffer(firstResult.data.offers);
        }
      }
    } catch (err) {
      toast("Some error occurred", { hideProgressBar: true, type: "error" });
      console.log(err);
    }
  };

  const fetchOffers = async (leadId) => {
    if (!leadId) return false;

    try {
      const loanOfferRes = await callApi(
        `v1/loan_offer/lead_id/${leadId}`,
        "get",
        {},
        "core",
        user.token
      );

      return loanOfferRes;
    } catch (err) {
      console.error("Error in offer fetching", err);
      toast.error("Something went wrong while fetching offers.");
      setIsFinished(true);
      return false;
    }
  };
  const logoSrc = "/assets/img/newLogo.png";

  const hamburgerSrc = "/assets/img/lp1hamberger.png";

  return (
    <div id="offer-page-v3" className="offer-page-v3">
      {isOffer.length > 0 ? (
        <>
          <header className="header">
            <img src={logoSrc} alt="Digit Money Logo" className="logo-img" />
            <button className="menu-btn" aria-label="Menu">
              <img src={hamburgerSrc} alt="Menu" className="hamburger-icon" />
            </button>
          </header>
          {/* <div className="final-offers-container"></div> */}
          <div className="offer-cards-container10">
            {/* <img src="../../../../../assets/img/Thank you page bg svg.svg" /> */}
            {/* <div className="offer-bg-layer" /> */}
            <h2 className="congrats-text10">Thank You for</h2>
            <h2 className="congrats-text10">Applying!</h2>
            {offers.map((offer) => (
              <OfferCard
                key={offer._id}
                offer={offer}
                isExpanded={expandedOfferId === offer._id}
                onExpand={() => setExpandedOfferId(offer._id)}
              />
            ))}
            <p className="disclaimer-offer-text-v30">
              We're thrilled you choose us for your business loan! Your details
              have been sent to our trusted lending partners for processing,
              which takes about 2-3 days. You'll be contacted soon with the next
              steps!
            </p>

            <hr
              style={{
                height: "2px",
                width: "158px",
                top: "515px",
                left: "116px",
                borderWidth: "2px",
                color: "#5DB989",
              }}
            />

            <p className="disclaimer-text">
              *These pre-approved offers are subject to change at discretion of
              Bank / NBFC after receiving all you documents and details. Final
              offer will be based on risk policy of Bank / NBFC. We do not
              guarantee that final offer will be same as Pre-approved offer.
            </p>
          </div>
        </>
      ) : (
        <>
          <header className="header">
            <img src={logoSrc} alt="Digit Money Logo" className="logo-img" />
            <button className="menu-btn" aria-label="Menu">
              <img src={hamburgerSrc} alt="Menu" className="hamburger-icon" />
            </button>
          </header>
          {/* <div className="final-offers-container"></div> */}
          <div className="offer-cards-container1">
            {/* <div className="offer-bg-layer" /> */}
            <img
              src="../../../../../assets/img/Group.png"
              alt="Digit Money Logo"
              className="logo-img1"
            />
            <h2 className="sry-text">
              Sorry you are not eligible for Business Loan at the moment.
            </h2>
            <h2 className="sry-text2">
              But don’t worry, lets quickly check your eligibility for Personal
              Loan
            </h2>
            <FormInputStyle2
              label="Monthly Income"
              value={monthlyIncome}
              id="monthlyIncome"
              onChange={(e) => {
                let raw = e.target.value.replace(/,/g, "");
                if (/^\d*$/.test(raw)) {
                  const formatted = Number(raw).toLocaleString("en-IN");
                  setMonthlyIncome(formatted);
                  if (errors.monthlyIncome) {
                    setErrors((prev) => ({ ...prev, monthlyIncome: false }));
                  }
                }
              }}
              onBlur={() => {
                const raw = monthlyIncome.replace(/,/g, "");
                if (!raw.match(/^\d+$/)) {
                  setErrors((prev) => ({ ...prev, monthlyIncome: true }));
                }
              }}
              isValid={!errors.monthlyIncome}
              errorMessage="Enter valid income"
            />
            <FormButtonStyle2
              text="Check My Offers"
              onClick={handleContinue}
              disabled={!isFormValid}
              id="btn-personal-details-landing-v1"
              className="tracking-btn-personal-details-landing-v1"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OfferPage;
