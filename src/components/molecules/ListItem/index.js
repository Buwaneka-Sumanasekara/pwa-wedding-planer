/*
 * File: index.js
 * File Created: Wednesday, 9th September 2020 6:58:00 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Wednesday, 9th September 2020 6:58:00 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */
import React, { useState } from "react";
import clsx from "clsx";
import "./styles.scss";
import Icon from "../../atoms/Icon";
import Typography from "../../atoms/Typography";

import { Spinner, Button, Badge } from "react-bootstrap";

const ListItem = (props) => {
  const { title, subTitle } = props;
  return (
    <div className={"list-item py-2"}>
      <div className={"list-item-top-wrapper d-flex justify-content-between"}>
        <div className={"list-item-top list-item-top-wrapper-left"}></div>
        <div className={"list-item-top list-item-top-wrapper-mid py-2"}>
          <Typography Tag={"h1"}>{title}</Typography>
          <Typography Tag={"h3"}>{subTitle}</Typography>
        </div>
        <div className={"list-item-top list-item-top-wrapper-right"}></div>
      </div>

      <div className={"list-item-bottom-wrapper"}>
        <Badge variant="secondary">New</Badge>
        <Badge variant="secondary">New</Badge>
        <Badge variant="secondary">New</Badge>
      </div>
    </div>
  );
};

export default ListItem;
