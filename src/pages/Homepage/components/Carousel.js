import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { setUserClickData } from "../../../utility/setUserClickData";

const CustomCarousel = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
  }, []);

  const calculateCarouselItems = () => {
    setUserClickData({ event_name: "calculate_carousel_home_page" });
    if (windowWidth >= 1400) {
      return 5;
    } else if (windowWidth > 1200 && windowWidth < 1400) {
      return 4;
    } else if (windowWidth > 780 && windowWidth < 1200) {
      return 3;
    } else if (windowWidth > 540 && windowWidth < 780) {
      return 2;
    } else {
      return 1;
    }
  };

  return (
    <OwlCarousel
      loop={true}
      items={calculateCarouselItems()}
      autoplay={true}
      autoplaySpeed={2000}
      className="owl-theme"
    >
      {data &&
        data.length !== 0 &&
        data.map((item, index) => (
          <div key={index} className="slide-item card quick item">
            <div className="caption">
              <>
                <span className="normal">{item.text1 ? item.text1 : " "}</span>
                <br />
              </>
              <span className="normal2">{item.text2 ? item.text2 : " "}</span>
            </div>
            <div className="caption_img">
              <img src={item.img} alt="" className="" />
            </div>
          </div>
        ))}
    </OwlCarousel>
  );
};

export default CustomCarousel;
