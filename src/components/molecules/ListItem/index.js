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
  const { key, title, subTitle, tags, tableNo, inviteMode, seats } = props;
  return (
    <div className={"list-item py-2"}>
      <div
        className={
          "list-item-top-wrapper d-flex justify-content-between py-2 border-bottom border-secondary"
        }
      >
        <div
          className={
            "list-item-top-wrapper-left pr-1 d-flex align-content-between flex-wrap justify-content-center"
          }
        >
          <div className={"list-item-icon text-center w-100"}>
            <Icon icon={"user"} />
            <Icon icon={"user"} />
            <Icon icon={"user"} />
          </div>
          <div className={" text-center w-100"}>
            <Typography Tag={"p"}>{`Seats`}</Typography>
            <Typography Tag={"h3"}>{seats}</Typography>
          </div>
          <div className={"text-center w-100"}>
            <Badge variant="info">
              <Typography Tag={"small"}>{inviteMode}</Typography>
            </Badge>
          </div>
        </div>
        <div
          className={
            "list-item-top list-item-top-wrapper-mid d-flex align-content-between flex-wrap  px-2"
          }
        >
          <Typography Tag={"h2"} className={"w-100"}>
            {title}
          </Typography>
          <Typography Tag={"p"} className={"w-100"}>
            {subTitle}
          </Typography>
          <div className={"list-item-top-wrapper-mid-bottom w-100 pt-1"}>
            {tags.map((v, i) => (
              <Badge
                key={`${key}tags${i}`}
                className={"mr-1"}
                variant="primary"
              >
                {v}
              </Badge>
            ))}
          </div>
        </div>
        <div
          className={"list-item-top list-item-top-wrapper-right text-center"}
        >
          <Typography Tag={"h4"}>{"Table No"}</Typography>
          <Typography Tag={"h1"}>{`${tableNo > 0 ? tableNo : ""}`}</Typography>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
