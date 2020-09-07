/*
 * File: index.js
 * File Created: Monday, 31st August 2020 5:06:15 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Monday, 31st August 2020 5:06:16 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */
import axios from "axios";

import invitation from "./invitation";
import common from "./common";
import guests from "./guests";

const API_URL = process.env.REACT_APP_API_ENDPOINT;

axios.defaults.baseURL = API_URL;
const { appVersion, userAgent } = window.navigator;
const source = process.env.REACT_APP_PRODUCT;

axios.defaults.headers.common["x-source"] = source;
axios.defaults.headers.common["x-device"] = appVersion;
axios.defaults.headers.common["x-browser"] = userAgent;

export default {
  invitation: invitation(axios, `/invitation`),
  common: common(axios, `/common`),
  guests: guests(axios, `/guests`),
};
