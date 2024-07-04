import React, { useEffect, useState } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import Stepper from "../../../components/Form/Stepper";
import FormButton from "../../../components/Buttons/FormButton";
import _ from "lodash";
import SalariedForm from "./SalariedForm";
import SelfEmployedForm from "./SelfEmployedForm";
import { useDispatch, useSelector } from "react-redux";
import { setLead, setOffers } from "../../../store/app/appReducer";
import callApi from "../../../utility/apiCaller";
import OfferTile from "./OfferTile";
import { toast } from "react-toastify";
import { getAllianceLeadFromMoneyTapInput } from "../../../utility/commonUtils";
import { setUserClickData } from "../../../utility/setUserClickData";
import { TRACK_ID } from "../../../utility/enum";

const OfferDetailsSegment = () => {
  const dispatch = useDispatch();
  const lead = useSelector((state) => state.app.lead);
  const user = useSelector((state) => state.app.user);
  const offers = useSelector((state) => state.app.offers);
  const [isFinished, setIsFinished] = useState(false);
  const [show, setShow] = useState(false);
  const [leadId, setLeadId] = useState();
  //   662a73413a05656cf94543c4

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
      const processedLead = getAllianceLeadFromMoneyTapInput("website", {
        ...lead,
        ...user,
      });

      const res = await callApi(
        "v1/lead/website-lead",
        "post",
        {
          lead: { ...processedLead, tracking_id: trackId },
        },
        "core",
        user.token
      );
      console.log(res);
      if (res.status === "Success" && res.data.lead) {
        setLeadId(res.data.lead._id);
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
        dispatch(setOffers(res.data.offers ?? []));
        if (res.data.lead?.all_responses) {
          setIsFinished(
            res.data.lead?.all_responses === res.data.lead?.total_response
          );
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

  return (
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
            <span className="text-2xl font-normal">{lead.name}!!</span>{" "}
          </h3>
          <h3 className="text-lg">Your pre-approved offers </h3>

          <div className="px-10 py-1 mt-4 text-xs font-semibold bg-gray-300 rounded">
            RECOMMENDED
          </div>
          {[...offers]
            .sort((a, b) => parseInt(a.priority) - parseInt(b.priority))
            .slice(0, 1)
            .map((e, i) => (
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
              .slice(1, show ? 1000 : 4)
              .map((e, i) => (
                <div key={e._id} className="">
                  <OfferTile small offer={e} />
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
            *These pre-approved offers are subject to change at discretion of
            Bank / NBFC after receiving all your documents and details. Final
            offer will be based on risk policy of Bank / NBFC. We do not
            guarantee that final offer will be same as Pre-approved offer.
          </h4>
        </div>
      )}
    </div>
  );
};

export default OfferDetailsSegment;
