import React, { useEffect, useState } from "react";
import FormButton from "../../../components/Buttons/FormButton";
import { convertNumberToIndianFormat } from "../../../utility/numberUtility";
import { setUserClickData } from "../../../utility/setUserClickData";
import Model from "./OfferModel";
import NewOfferModel from "./NewOfferModel";
import NiroFormButton from "../../../components/Buttons/NiroFormButton";

const OfferTile = ({ offer, small, source }) => {
  const [show, setShow] = useState(false);
  const [offerLink, setOfferLink] = useState("");
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [show]);

  const handleContinueClick = () => {
    setShow(false);
    setUserClickData({ event_name: "offer-continue-button" });

    var win = window.open(`${offer.app_url}${source}`, "_blank");
    win.focus();
  };

  const handleClick = () => {
    if (offer.lender_name === "Prefr") {
      setShow(true);
      return;
    }
    if (offer.lender_name === "CashE") {
      setOfferLink(`${offer.app_url}${source}`);
      setShowModel(true);
      return;
    }

    setUserClickData({ event_name: "offer-apply-button" });
    var win = window.open(`${offer.app_url}${source}`, "_blank");
    win.focus();
  };

  return (
    <div className="flex flex-col ">
      <div style={{ position: "relative" }}></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          marginTop: "30px",
          background: "linear-gradient(to right, #0095bd 0%, #0095bd 100%)",
          borderRadius: "1em",
          width: "22em",
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: "8",
            borderRadius: "100px",
            width: "100px",
            height: "100px",
            background: "#fff",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-50px",
            // marginLeft: "2em",
            boxShadow: "0 0 5px 0.5pt #d3d3d3",
          }}
        >
          <img width={small ? 100 : 200} src={"assets/bank_img/niro.png"} />
        </div>
        {/* <img width={small ? 100 : 200} src={offer?.logo_image_url} />
        <h2
          className={`${
            small ? "text-sm" : "text-3xl"
          } font-semibold text-[#00c0ff]`}
        >
          {convertNumberToIndianFormat(offer.credit_limit ?? 0)}
        </h2> */}

        <div>
          {/* <h5 className="my-2 text-xs font-semibold">
            Tenure: {offer.tenure} Months
          </h5> */}
          <h5
            className="mt-20 text-xs font-semibold"
            style={{
              color: "#fff",
              textAlign: "center",
            }}
          >
            Maddy Bellwoar
          </h5>
          <h1
            className="mt-3 font-bold "
            style={{
              color: "#fff",
              fontSize: "30px",
              whiteSpace: "nowrap",
              padding: "1em 0",
            }}
          >
            Amount:
            {convertNumberToIndianFormat(offer.credit_limit ?? 0)}
          </h1>

          {/* <h5 className="text-xs font-semibold">
            EMI: {convertNumberToIndianFormat(offer.emi ?? 0)}
          </h5> */}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h5
          className="text-xs font-semibold "
          style={{
            marginTop: "10px",
          }}
        >
          Powered by the Niro
        </h5>
      </div>
      <NiroFormButton onClick={handleClick} className="!mt-4 !min-w-64">
        ACCEPT AND CONTINUE
      </NiroFormButton>

      {/* <div>
          {show == true && (
            <Model
              show={show}
              handleClick={handleContinueClick}
              setShow={setShow}
              offer={offer}
            />
          )}
        </div> */}

      {/* {small && (
        <FormButton small={small} onClick={handleClick} className="!mt-2">
          APPLY NOW
        </FormButton>
      )} */}
      {showModel && (
        <NewOfferModel
          show={showModel}
          setShow={setShowModel}
          offerLink={offerLink}
        />
      )}
    </div>
  );
};

export default OfferTile;
