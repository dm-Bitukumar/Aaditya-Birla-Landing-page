import React, { Fragment, useEffect } from "react";
// import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import FormButton from "../../../components/Buttons/FormButton";

const Model = ({ show, setShow, offerLink }) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0",
          bottom: "0",
          height: "100svh",
          zIndex: "10",
          background: "#fff",
          left: "0",
          right: "0",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            height: "4.5em",
            width: "100%",
            background: "#fff",
            border: "1px solid #ccc",
          }}
        >
          <span
            style={{
              paddingLeft: "0.6em",
              paddingTop: "0.5em",
              // paddingBottom: "0em",
              paddingRight: "0.6em",
              margin: "0.6rem",
              borderRadius: "0.6em",
              cursor: "pointer",
              fontSize: "1.2em",
              fontWeight: "500",
              border: "1px solid #111",
            }}
            onClick={() => {
              setShow(false);
            }}
          >
            close
          </span>
        </div>
        <iframe
          src={offerLink}
          width="100%"
          style={{
            position: "relative",
            height: "96svh",
            width: "100%",
            border: "1px solid #ccc",
            background: "#fff",
          }}
        />
      </div>
    </>
  );
};

export default Model;
