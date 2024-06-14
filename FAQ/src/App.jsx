import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(false);
  const [count1, setCount1] = useState(false);
  const [count2, setCount2] = useState(false);
  const [count3, setCount3] = useState(false);

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        FAQ
      </h1>
      <div className="main">
        <div className="container">
          <div className="card1">
            <div
              style={{
                cursor: "pointer",
              }}
              className="heading"
            >
              <h1>How can I get help if I'm stuck on a challenge?</h1>
              {count ? (
                <h1 onClick={() => setCount(!count)}>-</h1>
              ) : (
                <h1 onClick={() => setCount(!count)}> + </h1>
              )}
            </div>
            {count ? (
              <p>
                The best (and quickest) way to get help on a challenge is in our
                Discord server. There are thousands of other developers in
                there, so it's a great place to ask questions. We even have a
                dedicated "help" channel! If you haven't joined yet, you can get
                an invite to our Discord server here.
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="card2">
            <div className="heading">
              <h1>Is there an official solution I can take a look at?</h1>
              {count1 ? (
                <h1 onClick={() => setCount1(!count1)}>-</h1>
              ) : (
                <h1 onClick={() => setCount1(!count1)}> +</h1>
              )}
            </div>

            {count1 ? (
              <p>
                We don't provide "official" solutions for the challenges. This
                is because there is no single perfect way to complete a
                challenge. Instead, you're encouraged to review other people's
                code in the community. You can learn so much by seeing how other
                people have approached the same challenges and giving them
                feedback
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="card2">
            <div className="heading">
              <h1>Can I use libraries/frameworks on these projects?</h1>
              {count2 ? (
                <h1 onClick={() => setCount2(!count2)}>-</h1>
              ) : (
                <h1 onClick={() => setCount2(!count2)}> + </h1>
              )}
            </div>

            {count2 ? (
              <p>
                Yes! Our challenges provide professional designs but there are
                no rules on what tools to use. So feel free to use anything you
                like to build your projects.
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
