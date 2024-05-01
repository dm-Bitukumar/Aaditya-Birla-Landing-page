import React from "react";
import MainFooter from "./Homepage/components/MainFooter";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <div className="w-full h-screen bg-black ">
        <div className="px-[110px] pt-20 ">
          <img src="/assets/img/logo.png" alt="" width={120} />
        </div>

        <div className="pt-24 text-center">
          <h1 className="text-[40px]  text-white">Contact us</h1>

          <Link
            className="text-[98px] text-[#00a5ca]"
            to="mailto:hello@digitmoney.in"
          >
            {" "}
            hello@digitmoney.in{" "}
          </Link>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default Contact;
