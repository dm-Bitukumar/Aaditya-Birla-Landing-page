import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Provider} from "react-redux";
import store from "./store";
import {BrowserRouter, Routes} from "react-router-dom";
import {routes} from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                {routes}
            </Routes>
        </BrowserRouter>
    </Provider>
);
