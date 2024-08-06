import React, { useEffect, useState } from "react";
// import HeadBar from "../../../components/Static/HeadBar";
// import Stepper from "../../../components/Form/Stepper";
import { useSelector } from "react-redux";
import _ from "lodash";
import { setUserClickData } from "../../../../utility/setUserClickData";
import callApi from "../../../../utility/apiCaller";
import OfferTile from "../../../PersonalDetails/components/OfferTileNew";
import OfferTile2 from "../../../PersonalDetails/components/OfferTileNew2";
import { getAllianceLeadFromMoneyTapInput } from "../../../../utility/commonUtils";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { TRACK_ID } from "../../../../utility/enum";
import FormButton from "../../../../components/Buttons/FormButton";

const NewOffer = ({ showPage, setShowPage }) => {
  const lead = useSelector((state) => state.app.lead);
  const user = useSelector((state) => state.app.user);
  const [leadId, setLeadId] = useState();
  const [leads, setLeads] = useState();
  const [offers, setOffers] = useState();
  const [show, setShow] = useState(false);
  const [source, setSource] = useState("");
  const [params] = useSearchParams();

  useEffect(() => {
    // if (params.get("lid")) fetchOffers(params.get("lid"));
    if (params.get("source")) setSource(params.get("source"));
  }, [params]);
  useEffect(() => {
    if (!leadId) {
      submitLead();
    }
  }, [leadId]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (leadId) fetchOffers();
    }, 5000);

    return () => clearInterval(timer);
  }, [leadId]);
  const fetchOffers = async () => {
    try {
      const res = await callApi(
        `v1/loan_offer/lead_id/${leadId}`,
        "get",
        {},
        "core"
      );

      const res2 = await callApi(`v1/lender/active-lenders`, "get", {}, "loan");

      if (res.status === "Success") {
        let activeLenders = res2.data.lenderList ?? [];
        let localOffers = res.data.offers ?? [];
        let localOffer = res.data.offers ?? [];
        localOffers = localOffers.filter((e) =>
          activeLenders.map((e) => e._id).includes(e.lender_id)
        );
        let arr = [];
        for (let item1 of localOffer) {
          for (let item of activeLenders) {
            if (item?._id === item1?.lender_id) {
              arr.push({ ...item1, logo_image_url: item?.logo_image_url });
            }
          }
        }

        setOffers(arr);
        console.log(arr);

        setLeads(res.data.lead);
        setShowPage(!showPage);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          lead: {
            ...processedLead,
            tracking_id: trackId,
            utm_medium:
              source === "0"
                ? "SMS"
                : source === "1"
                ? "Whatsapp"
                : source === "2"
                ? "IVR"
                : source === "4"
                ? "RCS"
                : "",
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

  const handelShow = () => {
    setShow(true);
    setUserClickData({ event_name: "view-more" });
  };

  return (
    <div
      className={
        "form-signin-apply form-signin !bg-[#F4F8FF] !border-solid !border-2 !border-[#F4F8FF]"
      }
    >
      {/* <HeadBar />
      <Stepper
        steps={["Personal Details", "Work Details", "Offer Page"]}
        currentStep={2}
      /> */}
      {!offers && (
        <>
          <center
            style={{
              marginBottom: "1.25em",
            }}
          >
            <img src="/assets/img/logo.png" alt="" />
          </center>
          <div className="mb-4 font-normal text-center">
            Please wait while we are searching best offers for you
            <span class="ml-2 dot-pulse"></span>
          </div>
        </>
      )}
      {offers && offers.length === 0 && (
        <>
          <center
            style={{
              marginBottom: "1.25em",
            }}
          >
            <img src="/assets/img/logo.png" alt="" />
          </center>
          <div className="mb-4 font-normal text-center">
            There is no offer for you currently.
          </div>
        </>
      )}
      {offers && offers.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <img src="/assets/img/Dm LOGO.png" />

          <h3 className="mt-8 text-lg text-center">
            Congratulations{" "}
            <span className="text-2xl font-normal">
              {leads?.contact_name}!!
            </span>{" "}
          </h3>
          <h3 className="text-lg">Your pre-approved offers </h3>

          <div
            className="px-6 py-2 mt-4 text-xs font-semibold rounded "
            style={{
              background: "#111",
              color: "#fff",
            }}
          >
            RECOMMENDED
          </div>
          {[...offers]
            .sort((a, b) => parseInt(a.priority) - parseInt(b.priority))
            .slice(0, 1)
            .map((e, i) => (
              <div
                key={e._id}
                style={{
                  marginTop: "0.7em",
                  marginBottom: "1em",
                }}
              >
                <OfferTile small={false} offer={e} source={source} />
              </div>
            ))}
          <div
            className={
              "grid gap-2" +
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
                  <OfferTile2 small offer={e} source={source} />
                </div>
              ))}
          </div>
          <p
            className="mt-3 mb-0 text-center"
            style={{
              fontSize: "10px",
            }}
          >
            Choose from these incredible offers that best suit your needs
          </p>
          {/* {offers.length > 4 && !show && (
            <div>
              <FormButton
                // small={small}
                onClick={handelShow}
                className="!mt-12 !w-40"
              >
                View more
              </FormButton>
            </div>
          )} */}
          <h4 className="mt-3 text-xs text-center">
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

export default NewOffer;
