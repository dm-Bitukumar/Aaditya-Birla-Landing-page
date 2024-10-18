import React, { useEffect, useState } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import Stepper from "../../../components/Form/Stepper";
import FormButton from "../../../components/Buttons/FormButton";
import callApi from "../../../utility/apiCaller";
import { setLead, setOffers } from "../../../store/app/appReducer";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";
import OfferTile from "./LtOfferTile";
import OfferTiles from "../../NiroPersonalDetail/components/OfferTile";
import { setUserClickData } from "../../../utility/setUserClickData";
import { toast } from "react-toastify";
import { TRACK_ID } from "../../../utility/enum";
import { sourceConvert } from "../../../utility/commonUtils";
import { getAllianceLeadFromMoneyTapInput } from "../../../utility/commonUtils";

const OfferDetailsSegment = ({ utmMedium }) => {
  const dispatch = useDispatch();
  const lead = useSelector((state) => state.app.lead);
  const user = useSelector((state) => state.app.user);
  const offers = useSelector((state) => state.app.offers);
  const [leadName, setLeadName] = useState("");
  const [show, setShow] = useState(false);
  const [leadOffers, setLeadOffers] = useState(null);
  const [source, setSource] = useState("");
  const [utmSource, setUtmSource] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [affId, setAffId] = useState("");
  const [leadId, setLeadId] = useState();

  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get("source")) setSource(params.get("source"));
    if (params.get("utm_source")) setUtmSource(params.get("utm_source"));
    if (params.get("aff_id")) setAffId(params.get("aff_id"));
  }, [params]);

  useEffect(() => {
    if (lead.stepDone === 2 && !leadId) {
      submitLead();
    }
  }, [lead]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (leadId) fetchOffers();
    }, 5000);

    return () => clearInterval(timer);
  }, [leadId]);

  const submitLead = async () => {
    setUserClickData({
      event_name: "personal-detail-api",
    });
    try {
      const trackId = localStorage.getItem(TRACK_ID);
      const processedLead = getAllianceLeadFromMoneyTapInput("pre", {
        ...lead,
        ...user,
      });

      const res = await callApi(
        "v1/lead/website-lead",
        "post",
        {
          lead: {
            ...processedLead,
            tracking_id: trackId,
            aff_id: affId,
            utm_source: utmSource,
            utm_medium: utmMedium ? utmMedium : "",
          },
          lender_id: "662752eb65fdba1a48d6e482",
        },
        "core",
        user.token
      );
      console.log(res);
      if (res.status === "Success" && res.data.lead) {
        setLeadId(res.data.lead?._id);
      }
    } catch (err) {
      toast("Some error occurred", { hideProgressBar: true, type: "error" });
      console.log(err);
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
        if (res.data.offers?.[0]?.lender_id === "662752eb65fdba1a48d6e482") {
          setLeadOffers(res.data.offers?.[0]);
          setLeadName(res.data.lead.contact_name);
        } else {
          dispatch(setOffers(res.data.offers ?? []));
          setLeadName(res.data.lead.contact_name);
          if (res.data.lead?.all_responses) {
            setIsFinished(
              res.data.lead?.all_responses === res.data.lead?.total_response
            );
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handelShow = () => {
    setShow(true);
    setUserClickData({ event_name: "view-more" });
  };
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {leadOffers !== null ? (
        <div
          className={"form-signin-apply "}
          style={{
            height: "100dvh",
            color: "GrayText",
          }}
        >
          <HeadBar />

          <div className="flex flex-col items-center justify-center">
            <img src="/assets/img/Dm LOGO.png" />

            <h3 className="mt-8 text-lg text-center">
              Congratulations{" "}
              <span className="text-2xl font-normal">{leadName}!!</span>{" "}
            </h3>
            <h3 className="text-lg">Your pre-approved offers </h3>
            {/* {of.length > 1 ? (
          <div className="px-10 py-1 mt-4 text-xs font-semibold bg-gray-300 rounded">
            RECOMMENDED
          </div> */}
            {/* ) : null */}
            <div className="my-4">
              <OfferTile
                small={false}
                offer={leadOffers}
                name={lead?.contact_name}
              />
            </div>
            {/* <div
              className="mt-5 text-center"
              style={{
                fontSize: "14px",
              }}
            >
              Give us a call on our toll-free number
              <div>
                <b>1800-209-3997 </b>
                for any queries
              </div>
            </div> */}
            <h4 className="mt-20 text-xs text-center">
              *These pre-approved offers are subject to change at discretion of
              Bank / NBFC after receiving all your documents and details. Final
              offer will be based on risk policy of Bank / NBFC. We do not
              guarantee that final offer will be same as Pre-approved offer.
            </h4>
          </div>
        </div>
      ) : (
        <div className={"form-signin-apply form-signin"}>
          <HeadBar />
          <Stepper
            steps={["Personal Details", "Work Details", "Offer Page"]}
            currentStep={2}
          />
          {!isFinished && offers?.length === 0 && (
            <div className="mb-4 font-normal text-center">
              Please wait while we are searching best offers for you
              <span class="ml-2 dot-pulse"></span>
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
                <span className="text-2xl font-normal">{leadName}!!</span>{" "}
              </h3>
              <h3 className="text-lg">Your pre-approved offers </h3>

              {offers.length > 1 ? (
                <div className="px-10 py-1 mt-4 text-xs font-semibold bg-gray-300 rounded">
                  RECOMMENDED
                </div>
              ) : null}
              {[...offers]
                .sort((a, b) => parseInt(a.priority) - parseInt(b.priority))
                .slice(0, 1)
                .map((e, i) => (
                  <div key={e._id} className="my-4">
                    <OfferTiles small={false} offer={e} source={source} />
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
                  .slice(1, show ? 1000 : 4)
                  .map((e, i) => (
                    <div key={e._id} className="">
                      <OfferTiles small offer={e} source={source} />
                    </div>
                  ))}
              </div>

              {offers.length > 4 && !show && (
                <div>
                  <FormButton
                    // small={small}
                    onClick={handelShow}
                    className="!mt-12 !w-40"
                  >
                    View more
                  </FormButton>
                </div>
              )}

              {!isFinished && (
                <div className="mt-4 font-normal text-center">
                  Please wait while we are searching best offers for you
                  <span class="ml-2 dot-pulse"></span>
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
          )}
        </div>
      )}
    </>
  );
};

export default OfferDetailsSegment;
