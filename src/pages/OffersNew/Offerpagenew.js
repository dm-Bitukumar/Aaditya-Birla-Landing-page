import { useNavigate, useSearchParams } from "react-router-dom";
import callApi from "../../utility/apiCaller";
import { useEffect } from "react";

const OffersPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const lid = params.get("lid");
  const source = params.get("source");

  useEffect(() => {
    const executeLogic = async () => {
      try {
        // First API call
        const res1 = await callApi(
          `v1/loan_offer/lead_id/${lid}`,
          "get",
          {},
          "core"
        );

        if (
          res1?.status === "Success" &&
          res1?.data?.lead &&
          res1?.data?.offers?.length > 0
        ) {
          const { lead, offers } = res1.data;
          // const contactPhone =
          //   offers.length > 0 ? offers[0].contact_phone : lead.contact_phone;
          // // Transform the lead object
          // const transformedLead = {
          //   id: lead._id,
          //   contact_name: lead.contact_name || "",
          //   contact_phone: contactPhone || "",
          // };

          // const transformedOffers = offers.map((offer) => ({
          //   lender_name: offer.lender_name,
          //   credit_limit: offer.credit_limit,
          //   emi: offer.emi,
          //   tenure: offer.tenure,
          //   app_url: offer.app_url,
          // }));

          // // Final transformed data for res2
          // const res2Payload = {
          //   lead: transformedLead,
          //   offers: transformedOffers,
          // };

          // Sending to the API
          // const res2 = await callApi(
          //   `v1/ican_api/data-send-with-offers-to-ican`,
          //   "post",
          //   res2Payload,
          //   "core"
          // );

          // const res3 = await callApi(
          //   `v1/ican_api/data-send-to-ClearTouch`,
          //   "post",
          //   { lead: transformedLead },
          //   "core"
          // );

          // Redirect to the desired page
          navigate(`/offers?lid=${lid}&source=${source}`);
        }
      } catch (error) {
        console.error("Error during API calls or navigation:", error);
      }
    };

    if (lid) {
      executeLogic();
    }
  }, [lid, navigate]);

  return null;
};

export default OffersPage;
