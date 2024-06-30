import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { setUserClickData } from "../../../utility/setUserClickData";

const Reviews = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
  }, []);

  const calculateCarouselItems = () => {
    if (windowWidth >= 990) {
      return 3;
    } else if (windowWidth > 540 && windowWidth < 990) {
      return 2;
    } else if (windowWidth < 540) {
      return 1;
    }
  };

  return (
    <section className="reviews">
      <div
        className="container m-auto"
        onClick={() => {
          setUserClickData({
            event_name: "carousel_reviews_page",
          });
        }}
      >
        <div className="heading">See What Others Are Saying</div>
        <OwlCarousel
          dots={false}
          loop={true}
          items={calculateCarouselItems()}
          autoplay={true}
          autoplaySpeed={2000}
          className="quotes owl-theme"
        >
          {data &&
            data.length !== 0 &&
            data.map((quote, index) => (
              <div key={index} className="slide-item card quick item">
                <div className="quote">{'"' + quote.text + '"'}</div>
              </div>
            ))}
        </OwlCarousel>
      </div>
    </section>
  );
};

export default Reviews;
