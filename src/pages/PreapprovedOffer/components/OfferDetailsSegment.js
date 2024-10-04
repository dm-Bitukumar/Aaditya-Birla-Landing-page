import React, { useEffect, useState } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import Stepper from "../../../components/Form/Stepper";
import _ from "lodash";
import callApi from "../../../utility/apiCaller";
import OfferTile from "../../PreapprovedOffer/components/OfferTile";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import FormButton from "../../../components/Buttons/FormButton";
import { setUserClickData } from "../../../utility/setUserClickData";

const OfferDetailsSegment = () => {
  const [lead, setLead] = useState();
  const [offers, setOffers] = useState();
  const [show, setShow] = useState(false);
  const [source, setSource] = useState("");
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get("phone")) fetchOffers(params.get("phone"));
  }, [params]);

  const fetchOffers = async (phone) => {
    try {
      const res = await callApi(
        `v1/preapproved_lead/list`,
        "post",
        {
          filters: { contact_phone: phone },
        },
        "core"
      );

      if (res.status === "Success") {
        let localOffers = res.data.preapproved_leadList ?? [];
        // localOffers = localOffers.filter((e) =>
        //   activeLenders.map((e) => e._id).includes(e.lender_id)
        // );

        setOffers(localOffers);
        setLead(res.data.preapproved_leadList?.[0]?.contact_name);
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
      {!offers && (
        <div className="mb-4 font-normal text-center">
          Please wait while we are searching best offers for you
          <span class="ml-2 dot-pulse"></span>
        </div>
      )}
      {offers && offers.length === 0 && (
        <div className="mb-4 font-normal text-center">
          There is no offer for you currently.
        </div>
      )}
      {offers && offers.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <img src="/assets/img/Dm LOGO.png" />

          <h3 className="mt-8 text-lg text-center">
            Congratulations{" "}
            <span className="text-2xl font-normal">
              {lead?.split(" ")[0]}!!
            </span>{" "}
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
                <OfferTile small={false} offer={e} source={source} />
              </div>
            ))}
          <div
            className={
              "grid gap-4" +
              (offers.length === 2
                ? "flex justify-center"
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
                  <OfferTile small offer={e} source={source} />
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
