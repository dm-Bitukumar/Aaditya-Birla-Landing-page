import React from "react";
import "./Testimonials.css";

const testimonialsData = [
  {
    name: "Sudhir Vanjare",
    location: "CBD Belapur - Navi Mumbai",
    message:
      "The customer service provided by the team was a big value add. A special mention for the fast processing of the loan which was very important for me.",
    avatar: "/assets/img/image1.png",
  },
  {
    name: "Priya Sharma",
    location: "Andheri East - Mumbai",
    message:
      "I am extremely happy with how easy the application process was. The team was organized and made sure I had everything I needed to succeed.",
    avatar: "/assets/img/image1.png",
  },
  {
    name: "Ravi Kumar",
    location: "HSR Layout - Bangalore",
    message:
      "A big thumbs up to the DigitMoney team! Transparent process and quick disbursal helped me when I needed it the most.",
    avatar: "/assets/img/image1.png",
  },
];

const Testimonials = () => {
  return (
    <div className="testimonial-section">
      <div className="testimonial-label">Testimonials</div>
      <p className="testimonial-description">
        We don’t just generate leads; we help you acquire long-term customers
        through data-driven strategies tailored to your business goals.
      </p>
      <h2 className="testimonial-heading">
        From Our <br />
        Community
      </h2>

      <div className="testimonial-cards-wrapper">
        {testimonialsData.map((item, idx) => (
          <div
            key={idx}
            className={`testimonial-card ${idx % 2 !== 0 ? "white" : ""}`}
          >
            <img
              src="/assets/img/Testimonials.svg"
              alt="quote"
              className="quote-icon"
            />
            <p className="testimonial-message">{item.message}</p>
            <img
              src="/assets/img/stars.svg"
              alt="rating"
              className="star-icon"
            />
            <div className="testimonial-user">
              <img src={item.avatar} alt={item.name} className="avatar" />
              <div>
                <p className="user-name">{item.name}</p>
                <p className="user-location">{item.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
