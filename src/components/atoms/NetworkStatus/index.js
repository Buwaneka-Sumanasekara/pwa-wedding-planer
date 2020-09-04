/*
 * Author: Buwaneka Sumanasekara (bsumanasekara@mitrai.com)
 * Date: Tuesday, 11th August 2020 2:09:51 pm
 * Module: Cellcard Play Frontend
 * -----
 * Last Modified: Wednesday, 12th August 2020 8:49:37 am
 * Modified By: Buwaneka Sumanasekara (bsumanasekara@mitrai.com>)
 * Copyright © 2020 Cellcard Play. All rights reserved.
 */

import React, { useState, useEffect } from "react";
import "./style.scss";
import clsx from "clsx";

const ONLINE = "online";
const OFFLINE = "offline";

const NetworkStatusBar = ({ timeout: timeout }) => {
  const [IsOnline, setNetworkStatus] = useState(null);
  const [IsVisisble, setVisibility] = useState(false);
  useEffect(() => {
    function handleStatusChange(e) {
      setNetworkStatus(e.type === ONLINE);
      setVisibility(true);
      if (e.type === ONLINE) {
        setTimeout(() => setVisibility(false), timeout);
      }
    }

    window.addEventListener(ONLINE, handleStatusChange);
    window.addEventListener(OFFLINE, handleStatusChange);
    return () => {
      window.removeEventListener(ONLINE, handleStatusChange, false);
      window.removeEventListener(OFFLINE, handleStatusChange, false);
    };
  });

  return (
    <React.Fragment>
      <div
        className={clsx(
          "network-status-default",
          IsVisisble ? "d-flex" : "d-none",
          "w-100 px-1  justify-content-center align-items-center"
        )}
      >
        <p className={"text-center px-1"}>
          {IsOnline
            ? "Yay! You are back online."
            : "You are offline. Please check your internet connection."}
        </p>
      </div>
    </React.Fragment>
  );
};

NetworkStatusBar.defaultProps = {
  timeout: 7000,
};

export default NetworkStatusBar;
