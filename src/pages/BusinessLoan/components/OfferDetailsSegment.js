import React, { useEffect, useState } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import Stepper from "../../../components/Form/Stepper";
import FormButton from "../../../components/Buttons/FormButton";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setLead, setOffers } from "../../../store/app/appReducer";
import callApi from "../../../utility/apiCaller";
import OfferTile from "../../PersonalDetails/components/OfferTile";
import { toast } from "react-toastify";
import {
  getAllianceLeadFromMoneyTapInput,
  getBusinessTurnoverFromEntry,
  getBusinessVintageFromEntry,
} from "../../../utility/commonUtils";

const OfferDetailsSegment = () => {
  const dispatch = useDispatch();
  const lead = useSelector((state) => state.app.lead);
  const user = useSelector((state) => state.app.user);
  const offers = useSelector((state) => state.app.offers);
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
    try {
      const res = await callApi(
        `v1/lead/${lead._id}/update-lead`,
        "post",
        {
          lead: {
            ...lead,
            gst: lead.gst_no,
            turnover: getBusinessTurnoverFromEntry(lead.turnover),
            business_vintage: getBusinessVintageFromEntry(lead.company_age),
          },
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={"form-signin-apply form-signin"}>
      <HeadBar />
      <Stepper
        steps={["Personal Details", "Work Details", "Offer Page"]}
        currentStep={2}
      />
      {offers?.length === 0 && (
        <div
          style={{
            fontFamily: "Montserrat sans-serif",
          }}
          className="text-xl font-normal text-center"
        >
          Please wait while we are searching best offers for you
        </div>
      )}
      {offers?.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <img src="/assets/img/Dm LOGO.png" />

          <h3 className="mt-8 text-lg">
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
          <div className="grid grid-cols-3 gap-4">
            {[...offers]
              .sort((a, b) => parseInt(a.priority) - parseInt(b.priority))
              .slice(1)
              .map((e, i) => (
                <div key={e._id} className="">
                  <OfferTile small offer={e} />
                </div>
              ))}
          </div>

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
