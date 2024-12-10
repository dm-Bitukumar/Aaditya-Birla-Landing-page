import React, { useEffect, useState, useRef } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import FormButton from "../../../components/Buttons/FormButton";
import { useDispatch, useSelector } from "react-redux";
import { setLead, setOffers } from "../../../store/app/appReducer";
import callApi from "../../../utility/apiCaller";
import OfferTile from "../../PersonalDetails/components/OfferTile";
import { useSearchParams } from "react-router-dom";
import { setUserClickData } from "../../../utility/setUserClickData";

const OfferDetails_v2 = () => {
  const lead = useSelector((state) => state.app.lead);
  const user = useSelector((state) => state.app.user);
  const offers = useSelector((state) => state.app.offers);
  const pollingInterval = useRef(null);
  const [lid, setLid] = useState(null);
  const [activeLenders, setActiveLenders] = useState([]); 
  const [isSearching, setIsSearching] = useState(true); 
  const [params] = useSearchParams();
  const [source, setSource] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const lidFromParams = params.get("lid");
    const sourceFromParams = params.get("source");
  
    if (lidFromParams) {
      setLid(lidFromParams);
      setSource(sourceFromParams || "");
  
      fetchActiveLenders();
      fetchOffers(lidFromParams);
  
      pollingInterval.current = setInterval(() => {
        fetchOffers(lidFromParams);
      }, 5000);
    }

    return () => clearInterval(pollingInterval.current);
  }, [params]);

  const fetchActiveLenders = async () => {
    try {
      const res = await callApi(
        `v1/lender/active-lenders`, 
        "get", 
        {}, 
        "loan"
      );
      if (res.status === "Success") {
        setActiveLenders(res.data.lenderList ?? []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOffers = async (lid) => {
    try {
      const res = await callApi(
        `v1/loan_offer/lead_id/${lid}`,
        "get",
        {},
        "core",
      );

      if (res.status === "Success") {
        let localOffers = res.data.offers ?? [];

        localOffers = localOffers.filter((e) =>
          activeLenders.map((lender) => lender._id).includes(e.lender_id)
        );

        if (localOffers.length > 0) {
          dispatch(setOffers(localOffers)); 
          dispatch(setLead(res.data.lead)); 
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
        setIsSearching(true); 
    }
  };

  const handleShowMore = () => {
    setShow(true);
    setUserClickData({ event_name: "view-more-check-offers-v2" });
  };

  return (
    <div className={"form-signin-apply form-signin"}>
      <HeadBar />
  
      {isSearching && offers?.length === 0 && (
        <div className="mb-4 font-normal text-center">
          Please wait while we are searching best offers for you
          <span className="ml-2 dot-pulse"></span>
        </div>
      )}
  
      {!isSearching && offers?.length === 0 && (
        <div className="mb-4 font-normal text-center">
          There is no offer for you currently.
        </div>
      )}

      {offers?.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <img src="/assets/img/Dm LOGO.png" />
  
          <h3 className="mt-8 text-lg text-center">
            Congratulations{" "}
            <span className="text-2xl font-normal">{lead?.contact_name || "Dear Customer"}!!</span>
          </h3>
          <h3 className="text-lg">Your pre-approved offers</h3>
  
          {offers.length > 1 ? (
            <div className="px-10 py-1 mt-4 text-xs font-semibold bg-gray-300 rounded">
              RECOMMENDED
            </div>
          ) : null}
          {[...offers]
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
                onClick={handleShowMore}
                className="!mt-12 !w-40"
              >
                View more
              </FormButton>
            </div>
          )}
  
          <h4 className="mt-4 text-xs text-center">
            *These pre-approved offers are subject to change at discretion of Bank / NBFC after
            receiving all your documents and details. Final offer will be based on risk policy of
            Bank / NBFC. We do not guarantee that final offer will be same as Pre-approved offer.
          </h4>
        </div>
      )}
    </div>
  );
  
  
};

export default OfferDetails_v2;
