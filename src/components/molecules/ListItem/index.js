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

import { Badge, Button } from "react-bootstrap";
import Globals from "../../../constants/Globals";

import GuestCountUpdateModal from "../../molecules/GuestCountUpdateModal";

const getColor = (inviteMode) => {
  switch (inviteMode) {
    case Globals.InviteMode.MR:
      return "success";
    case Globals.InviteMode.MRS:
      return "danger";
    case Globals.InviteMode.MR_MRS:
      return "info";
    case Globals.InviteMode.FAMILY:
      return "dark";
    default:
      return "light";
  }
};

const ListItem = (props) => {
  const {
    id,
    title,
    subTitle,
    tags,
    tableNo,
    inviteMode,
    seats,
    side,
    attendedCount,
    onClickItem = () => {},
  } = props;

  const [SelectedGuest, setSelectedGuest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className={clsx(
          "list-item my-2 py-2 px-2",
          side === "B" ? "list-item-b" : "list-item-s"
        )}
        onClick={onClickItem}
      >
        <div
          className={
            "list-item-top-wrapper d-flex justify-content-between py-2 "
          }
        >
          <div
            className={
              "list-item-top-wrapper-left pr-1 d-flex align-content-between flex-wrap justify-content-center"
            }
          >
            <div className={"list-item-icon text-center w-100"}>
              {(inviteMode === Globals.InviteMode.MR ||
                inviteMode === Globals.InviteMode.MRS ||
                inviteMode === Globals.InviteMode.MS) && <Icon icon={"user"} />}
              {inviteMode === Globals.InviteMode.MR_MRS && (
                <>
                  <Icon icon={"user"} />
                  <Icon icon={"user"} />
                </>
              )}
              {inviteMode === Globals.InviteMode.FAMILY && (
                <>
                  <Icon icon={"user"} />
                  <Icon icon={"user"} />
                  <Icon icon={"user"} />
                </>
              )}
            </div>
            <div
              className={clsx(
                `seat-${attendedCount > 0 ? "confirm" : "pending"}`,
                "text-center w-100"
              )}
            >
              <Typography Tag={"p"}>{`seat`}</Typography>
              <>
                <Typography className={clsx("d-inline")} Tag={"h3"}>
                  {attendedCount > 0 ? `${attendedCount}` : seats}
                </Typography>
                {attendedCount > 0 && (
                  <>
                    {" "}
                    <Icon className={"d-inline"} icon={"check_circle"} />
                  </>
                )}
              </>
            </div>
            <div className={"text-center w-100"}>
              <Badge variant={getColor(inviteMode)}>
                <Typography Tag={"small"}>{inviteMode}</Typography>
              </Badge>
            </div>
          </div>
          <div
            className={clsx(
              "list-item-top list-item-top-wrapper-mid d-flex align-content-between flex-wrap  px-2",
              ""
            )}
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
                  key={`${id}tags${i}`}
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
            <Typography Tag={"h1"}>{`${
              tableNo > 0 ? tableNo : ""
            }`}</Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListItem;
