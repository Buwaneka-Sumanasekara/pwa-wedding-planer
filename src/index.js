import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import ReactPWAInstallProvider from "react-pwa-install";

import "./theme/assets/vendor/nucleo/css/nucleo.css";
import "./theme/assets/vendor/font-awesome/css/font-awesome.min.css";
import "./theme/assets/scss/argon-design-system-react.scss";
import "./theme/custom/custom.scss";

import App from "./App";

import * as serviceWorker from "./serviceWorker";

const store = configureStore();

ReactDOM.render(
  <ReactPWAInstallProvider enableLogging>
    <Provider store={store}>
      <App />
    </Provider>
  </ReactPWAInstallProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
serviceWorker.register();
