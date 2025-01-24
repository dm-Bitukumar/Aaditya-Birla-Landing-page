import React, { useEffect, useState, useRef } from "react";
import HeadBar from "../../../components/Static/HeadBar";
import { useSelector } from "react-redux";
import callApi from "../../../utility/apiCaller";
import OfferTile from "./OfferTileNew";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const OffersPage = ({ setStep, setLeadId }) => {
  const [preLoans, setPreLoans] = useState(null);
  const [contactName, setContactName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [affId, setAffId] = useState(null);
  const [utmMedium, setUtmMedium] = useState(null);
  const [ldr, setldr] = useState(null);
  const [searchParams] = useSearchParams();
  const lead = useSelector((state) => state.app.lead);

  const mobileNumber = useSelector((state) => state.app.user?.contact_phone);
  // const mobileNumber = "9922187005";
  const apiCallInProgress = useRef(false);

  useEffect(() => {
    setAffId(searchParams.get("aff_id"));
    setUtmMedium(searchParams.get("utm_medium"));
    setldr(searchParams.get("ldr"));
  }, [searchParams]);

  useEffect(() => {
    if (!lead?.lenderId || apiCallInProgress.current) return;
    apiCallInProgress.current = true;
    fetchListApiDetails(lead.lenderId, mobileNumber);
  }, [lead]);

  const fetchListApiDetails = async (lenderId, contactPhone) => {
    try {
      setIsLoading(true);

      const requestBody = {
        pageNum: 1,
        pageSize: 1000,
        filters: {
          lender_id: lenderId,
          contact_phone: contactPhone,
        },
      };

      const res = await callApi(
        "v1/preapproved_lead/list",
        "post",
        requestBody,
        "core"
      );

      if (
        res.status === "Success" &&
        res.data?.preapproved_leadList?.length > 0
      ) {
        const fetchedLeadId = res.data.preapproved_leadList[0]?._id;

        if (fetchedLeadId) {
          setLeadId(fetchedLeadId);
          fetchPreApprovedLoan(fetchedLeadId);
        } else {
          console.error("No valid lead ID found in the response.");
          setIsLoading(false);
        }
      } else {
        console.error("No preapproved loans found for the provided filters.");
        toast.error("No offers found for your profile.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error in fetchListApiDetails:", err);
      toast.error("Failed to fetch preapproved loans. Please try again.");
      setIsLoading(false);
    } finally {
      apiCallInProgress.current = false;
    }
  };

  const fetchPreApprovedLoan = async (id) => {
    try {
      setIsLoading(true);
      const res = await callApi(
        `v1/preapproved_lead/${id}`,
        "get",
        {},
        "core"
      );

      if (res.status === "Success") {
        setPreLoans(res.data?.preapproved_lead);

        let str1 = res.data?.preapproved_lead?.contact_name || "Customer";
        let firstName = str1.split(" ")[0];
        setContactName(firstName);

        try {
          const queryParams = new URLSearchParams(window.location.search);
          const affId = queryParams.get("aff_id");
          const utmMedium = queryParams.get("utm_medium");
          const ldr = parseInt(queryParams.get("ldr"), 10);

          const preapprovedLeadData =
          ldr === 4
            ? { utm_medium: utmMedium }
            : { aff_id: affId, utm_medium: utmMedium };

          await callApi(
            `v1/preapproved_lead/${id}/update_with_no_resp`,
            "post",
            {
              preapproved_lead: preapprovedLeadData,
            },
            "core"
          );

        } catch (updateError) {
          console.error("Error updating aff_id and utm_medium:", updateError);
          toast.warn(
            "Offer fetched successfully, but failed to update user details."
          );
        }
      } else {
        console.error("Failed to fetch preapproved loan data.");
      }
    } catch (err) {
      console.error("Error in fetchPreApprovedLoan:", err);
      toast.error("Failed to fetch preapproved loans. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={"form-signin-apply form-signin"}>
      <HeadBar />

      {isLoading && (
        <div className="mb-4 font-normal text-center">
          Please wait while we are searching the best offers for you
          <span className="ml-2 dot-pulse"></span>
        </div>
      )}

      {!isLoading && !preLoans && (
        <div className="mb-4 font-normal text-center">
          No offers found for your profile at the moment.
        </div>
      )}

      {!isLoading && preLoans && (
        <div className="flex flex-col items-center justify-center">
          <img src="/assets/img/Dm LOGO.png" />

          <h3 className="mt-8 text-lg text-center">
            Congratulations{" "}
            <span className="text-2xl font-normal">
              {contactName || "Dear Customer"}!!
            </span>
          </h3>

          <h3 className="text-base text-center">
            {ldr === "1"
              ? `You are pre-qualified for L&T Finance`
              : `Your pre-approved offers from ${lead?.lenderName}`}
          </h3>

          <div key={preLoans._id} className="my-4">
            <OfferTile
              small={false}
              offer={preLoans}
              setStep={setStep}
              mobileNumber={mobileNumber}
              hideData={ldr === "1"}
            />
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

export default OffersPage;
