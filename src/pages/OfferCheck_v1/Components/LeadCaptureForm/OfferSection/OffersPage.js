import React, { useEffect, useState } from "react";
import "./OffersPage.css";
import { useSelector, useDispatch } from "react-redux";
import { setOffers } from "../../../../../store/app/appReducer";
import callApi from "../../../../../utility/apiCaller";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { setUserClickData } from "../../../../../utility/setUserClickData";
import OfferCard from "./OfferCard";
import { TRACK_ID } from "../../../../../utility/enum";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";

const OfferPage = ({ formData, setShowOfferHeaderLogo }) => {
  const lead = useSelector((state) => state.app.lead);
  const user = useSelector((state) => state.app.user);
  const offers = useSelector((state) => state.app.offers);
  const dispatch = useDispatch();
  const [isFinished, setIsFinished] = useState(false);
  const [leadId, setLeadId] = useState();
  const [expandedOfferId, setExpandedOfferId] = useState(null);
  const [activeLenders, setActiveLenders] = useState([]);
  const [params] = useSearchParams();
  const [isTncChecked, setIsTncChecked] = useState(true);
  const mobile = formData?.mobile || "";
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const token = user?.token;

  const [ipAddress, setIpAddress] = useState("");

  async function fetchIp() {
    await fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        // ipAddress = data?.ip;
        setIpAddress(data?.ip);
        console.log("IP Address:", data?.ip);
        console.log(ipAddress);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
  useEffect(() => {
    fetchIp();
  }, []);

  useEffect(() => {
    fetchActiveLenders();
  }, []);

  useEffect(() => {
    if (formData.stepDone === 3 && !leadId) {
      submitLead();
    }
  }, [formData]);

  useEffect(() => {
    if (offers.length > 0 && !expandedOfferId) {
      setExpandedOfferId(offers[0]._id);
    }
  }, [offers]);

  useEffect(() => {
    if (offers.length > 0) {
      setShowOfferHeaderLogo(false);
    }
  }, [offers]);

  const fetchActiveLenders = async () => {
    try {
      const res = await callApi(`v1/lender/active-lenders`, "get", {}, "loan");
      if (res.status === "Success") {
        const apiLenders = res.data.lenderList ?? [];

        // const hardcodedLender = {
        //   _id: "662752eb65fdba1a48d6e482",
        //   lender_name: "L&T",
        // };

        const mergedLenders = [...apiLenders];

        setActiveLenders(mergedLenders);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const submitLead = async () => {
    setUserClickData({
      event_name: "submit-lead-offer-check-v1",
      user_id: leadId || "No User ID found here",
      affiliate_id: params.get("aff_id") || "No Aff_id found",
    });
    try {
      const leadResponse = await callApi(
        "v1/lead/lead-from-phone",
        "post",
        {
          phone: mobile,
          website_kyc_consent: isTncChecked,
        },
        "core",
        token
      );

      if (leadResponse["status"] === "Success" && leadResponse.data.lead) {
        const leadData = leadResponse.data.lead;

        const lenderResponse_new = await callApi(
          "v1/lender_api_call/list",
          "post",
          {
            filters: {
              lead_id: leadData._id,
              lender_name: "UnityBank",
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
        if (lenderResponse_new?.data?.lender_api_callCount < 1) {
          console.log("Calling bulk-lead-push-by-leadId", {
            leads: [{ lead_id: leadData._id }],
            lender_name: "UnityBank",
            lender_id: "67762d497ae263a3ec86347e",
          });
          await callApi(
            "v1/lead/bulk-lead-push-by-leadId",
            "post",
            {
              leads: [{ lead_id: leadData._id }],
              lender_name: "UnityBank",
              lender_id: "67762d497ae263a3ec86347e",
            },
            "core",
            token
          );
          await callApi(
            "v1/lead/bulk-lead-push-by-leadId",
            "post",
            {
              leads: [{ lead_id: leadData._id }],
              lender_name: "Incred",
              lender_id: "68401febe871a7a9504dc2e3",
            },
            "core",
            token
          );
        }

        await callApi(
          "v1/ican_api/ican_journey_tag_update",
          "post",
          {
            priority: "P1",
            lead_id: leadData._id,
          },
          "core"
        );
        await fetchOffers(leadData._id);
        // navigate(`/offers?lid=${leadData._id}&source=${source}`);
      } else {
        navigate(`/personal-loan?source=${source}`);
      }
    } catch (error) {
      console.log("Error fetching lead or calling APIs:", error);
      setIsFinished(true);
      navigate(`/personal-loan?source=${source}`);
    }
  };
  const fetchOffers = async (leadId) => {
    if (!leadId || isFinished) return false;

    try {
      const [offerRes, lenderRes] = await Promise.all([
        callApi(
          `v1/loan_offer/lead_id/${leadId}`,
          "get",
          {},
          "core",
          user.token
        ),
        callApi(`v1/lender/active-lenders`, "get", {}, "loan"),
      ]);

      if (
        offerRes.status === "Success" &&
        offerRes.data?.offers?.length > 0 &&
        lenderRes.status === "Success"
      ) {
        const offers = offerRes.data.offers;
        const apiLenders = lenderRes.data.lenderList ?? [];

        // const hardcodedLender = {
        //   _id: "67762d497ae263a3ec86347e",
        //   lender_name: "UnityBank",
        // };
        const hardcodedLender = [
          {
            _id: "67762d497ae263a3ec86347e",
            lender_name: "UnityBank",
          },
          {
            _id: "68401febe871a7a9504dc2e3",
            lender_name: "Incred",
          },
        ];
        const mergedLenders = [...apiLenders, hardcodedLender];

        const sortedOffers = _.orderBy(offers, ["priority"], ["asc"]);
        const filteredOffers = sortedOffers.filter((offer) =>
          mergedLenders.some((lender) => lender._id === offer.lender_id)
        );

        dispatch(setOffers(filteredOffers));
        setIsFinished(true);
        return true;
      } else {
        setIsFinished(true);
        return false;
      }
    } catch (err) {
      console.error("Error in offer fetching", err);
      toast.error("Something went wrong while fetching offers.");
      setIsFinished(true);
      return false;
    }
  };

  return (
    <div id="offer-page-v5">
      {offers.length > 0 ? (
        <>
          <div className="final-offers-container-v5">
            <>
              {/* <video
                className="background-video1"
                src="/assets/img/BG video.mp4"
                autoPlay
                loop
                muted
              /> */}
              <img
                src="/assets/img/Offer page BG image 1.png"
                alt="Square Check Background"
                className="background-overlay-img-offer"
              />
            </>
            <div className="offer-bg-layer-v5">
              <h2 className="congrats-text1">Congratulations!</h2>
              <h3 className="sub-text1">You’re Pre-Approved for</h3>
              <h3 className="sub-text1">a Personal Loan!</h3>
            </div>
          </div>

          <div className="offer-cards-container-new1">
            {offers.map((offer) => (
              <OfferCard
                key={offer._id}
                offer={offer}
                isExpanded={expandedOfferId === offer._id}
                onExpand={() => setExpandedOfferId(offer._id)}
              />
            ))}
            <p className="disclaimer-offer-new-text-v5">
              Choose from these incredible offers that best suit your needs
            </p>
            <p className="disclaimer-text1">
              *These pre-approved offers are subject to change at discretion of
              Bank / NBFC after receiving all your documents and details. Final
              offer will be based on risk policy of Bank / NBFC. We do not
              guarantee that final offer will be same as Pre-approved offer.
            </p>
          </div>
        </>
      ) : isFinished ? (
        setShowOfferHeaderLogo(true) || (
          <div className="no-offers-found">
            <h2 className="congrats-text">
              There is no offer for you currently.
            </h2>
          </div>
        )
      ) : (
        setShowOfferHeaderLogo(true) || (
          <div className="no-offers-found">
            <h2 className="congrats-text">
              Please wait while we are searching best offers for you
            </h2>
          </div>
        )
      )}
    </div>
  );
};

export default OfferPage;
