const PrivacyConcerns = () => {
  return (
    <section className="lock">
      <div className="container m-auto">
        <div className="float-end">
          <img src="/assets/img/mobile2.png" alt="" className="side-mobile2" />
        </div>
        <div className="lock-img">
          <img className={"m-auto"} src="/assets/img/lock.png" alt="" />
        </div>
        <div className="heading">
          We don't share <span> your data!</span>
        </div>
        <div className="row locks">
          <div className="col-md-6 col-12">
            <div className="row">
              <div className="col-md-3 col-12">
                <img src="/assets/img/lock1.png" alt="" />
              </div>
              <div className="col-md-9 col-12 lock-quote">
                There's <u>no room for mistakes</u> because we didn't leave any.
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row">
              <div className="col-md-3 col-12">
                <img src="/assets/img/lock2.png" alt="" />
              </div>
              <div className="col-md-9 col-12 lock-quote">
                Digitmoney ensures that all your personal data are{" "}
                <u>encrypted</u>.
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row">
              <div className="col-md-3 col-12">
                <img src="/assets/img/lock3.png" alt="" />
              </div>
              <div className="col-md-9 col-12 lock-quote">
                And <u>secured</u>, so what's yours remains only yours.
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12"></div>
        </div>
        <div>
          <img src="/assets/img/mobile.png" alt="" className="side-mobile" />
        </div>
      </div>
    </section>
  );
};

export default PrivacyConcerns;
