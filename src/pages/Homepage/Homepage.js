import { Link } from "react-router-dom";
import CustomCarousel from "./components/Carousel";
import EmiCalculator from "./components/EmiCalculator";
import DocumentsEligibility from "./components/DocumentEligibility";
import Reviews from "./components/Reviews";
import PrivacyConcerns from "./components/PrivacyConcerns";
import FaqsSection from "./components/FaqSection";
import MainFooter from "./components/MainFooter";

const carouselData = [
  {
    text1: "Home",
    text2: "renovation",
    img: "/assets/img/slider1.png",
  },
  {
    text1: "For your",
    text2: "special once",
    img: "/assets/img/slider2.png",
  },
  {
    text1: "Pay off your",
    text2: "Credit Cards",
    img: "/assets/img/slider3.png",
  },
  {
    text2: "Travel",
    img: "/assets/img/slider4.png",
  },
  {
    text1: "We have",
    text2: "get your back",
    img: "/assets/img/slider5.png",
  },
];
const itemsData = [
  {
    imgSrc: "/assets/img/moto1.png",
    title1: "Instant",
    title2: "Approvals",
  },
  {
    imgSrc: "/assets/img/moto2.png",
    title1: "Loans upto",
    title2: "10 Lacs",
  },
  {
    imgSrc: "/assets/img/moto3.png",
    title1: "Complete",
    title2: "Digital Process",
  },
  {
    imgSrc: "/assets/img/moto4.png",
    title1: "Quick",
    title2: "Disbursal",
  },
  {
    imgSrc: "/assets/img/moto5.png",
    title1: "No",
    title2: "Guarantors",
  },
  {
    imgSrc: "/assets/img/moto6.png",
    title1: "Tenure upto",
    title2: "60 Months",
  },
];

const quotes = [
  {
    text: "The application process was straightforward, and I appreciated the honesty in disclosing all associated fees. The low interest rates made my monthly payments manageable, and I'm happy with the overall value.",
  },
  {
    text: "I recently took out a personal loan. The entire process was seamless, from the easy online application to the quick approval. The interest rates were competitive, and the customer service was outstanding. I am highly satisfied with my experience.",
  },
  {
    text: "Clarity is crucial when it comes to loans. No hidden fees or surprises after approval. The online platform was user-friendly, and the support team was patient in addressing my questions.",
  },
  {
    text: "The application process was straightforward, and I appreciated the honesty in disclosing all associated fees. The low interest rates made my monthly payments manageable, and I'm happy with the overall value.",
  },
  {
    text: "I recently took out a personal loan. The entire process was seamless, from the easy online application to the quick approval. The interest rates were competitive, and the customer service was outstanding. I am highly satisfied with my experience.",
  },
  {
    text: "Clarity is crucial when it comes to loans. No hidden fees or surprises after approval. The online platform was user-friendly, and the support team was patient in addressing my questions.",
  },
];

const Homepage = () => {
  return (
    <div>
      <section className="banner">
        <div className="container m-auto">
          <Link to="/" className="banner-logo">
            <img src="/assets/img/logo.png" alt="" />
          </Link>
        </div>
        <div className="container m-auto text-center banner-img">
          <img src="/assets/img/banner.png" alt="" className={"mx-auto"} />
        </div>
        <div className="wb-moto">
          <div className="container m-auto">
            <div className="row card" style={{ flexDirection: "row" }}>
              {itemsData.map((item, index) => (
                <div key={index} className="col-md-2 col-4 m-auto text-center">
                  <img src={item.imgSrc} alt="" className="mx-auto my-1" />
                  <p className="mb-0">{item.title1}</p>
                  <p className="mb-0">{item.title2}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container m-auto">
          <div className="get_started_btn get_started_btn5 text-center mt-0">
            <Link to="/personal-loan">Get Started</Link>
          </div>
        </div>
      </section>
      <section className="facilities">
        <div className="container m-auto" style={{ margin: "auto" }}>
          <CustomCarousel data={carouselData} />
          <div className="get_started_btn get_started_btn1 text-center">
            <Link to={"/personal-loan"}>Get Started</Link>
          </div>
        </div>
      </section>
      <section className="video">
        <div className="container m-auto">
          <div className="play text-center">
            {/* <img src="./asset/img/lock.png" alt="" className="w-50" /> */}
          </div>
          <div className="get_started_btn get_started_btn2 text-center mt-0">
            {/* <a href="https://digitmoney.in/personal-loan">Get Started</a> */}
            <p className="coming_soon my-0">Coming Soon</p>
          </div>
        </div>
      </section>
      <EmiCalculator />
      <DocumentsEligibility />
      <Reviews data={quotes} />
      <section className="advertise">
        <div className="container m-auto">
          <div className="heading">
            Explore our latest news and updates from trusted sources.
          </div>
          <div className="get_started_btn get_started_btn2 text-center mt-4">
            <p className="coming_soon mb-0">Coming Soon</p>
          </div>
        </div>
      </section>
      <PrivacyConcerns />
      <FaqsSection />
      <MainFooter />
    </div>
  );
};

export default Homepage;
