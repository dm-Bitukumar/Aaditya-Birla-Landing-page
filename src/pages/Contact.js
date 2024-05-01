import React from "react";
import MainFooter from "./Homepage/components/MainFooter";

const Contact = () => {
  return (
    <>
      <div className="w-full h-screen bg-black ">
        <div className="px-[110px] pt-20 ">
          <img src="/assets/img/logo.png" alt="" width={120} />
        </div>

        <div className="pt-24 text-center">
          <h1 className="text-[40px]  text-white">Contact us</h1>

          <a
            className="text-[98px] text-[#00a5ca]"
            href="mailto:hello@digitmoney.in.com"
          >
            {" "}
            hello@digitmoney.in{" "}
          </a>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default Contact;
