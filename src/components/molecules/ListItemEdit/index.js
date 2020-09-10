/*
 * File: index.js
 * File Created: Wednesday, 9th September 2020 6:58:00 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Wednesday, 9th September 2020 6:58:00 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */
import React from "react";
import clsx from "clsx";
import "./styles.scss";
import Icon from "../../atoms/Icon";
import Typography from "../../atoms/Typography";

import { Badge, Button } from "react-bootstrap";
import Globals from "../../../constants/Globals";

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

const ListItemEdit = (props) => {
  const {
    id,
    title,
    subTitle,
    tags,
    tableNo,
    inviteMode,
    seats,
    refCode,
    linkGenerated,
    onClickGenerate = () => {},
  } = props;

  const url = `${window.location.origin}/invitation/${refCode}`;

  const copyToClipboard = () => {
    const textField = document.createElement("textarea");
    textField.innerText = url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

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
          <div className={" text-center w-100"}>
            <Typography Tag={"p"}>{`Seats`}</Typography>
            <Typography Tag={"h3"}>{seats}</Typography>
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
              <Badge key={`${id}tags${i}`} className={"mr-1"} variant="primary">
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
      <div
        className={clsx(
          "list-item-bottom-wrapper w-100  py-2 px-2",
          linkGenerated && "d-flex justify-content-between",
          !linkGenerated && "d-flex justify-content-center"
        )}
      >
        {linkGenerated && (
          <>
            <div className={"list-item-bottom-wrapper-left"}>
              <Typography Tag={"h4"}>{url}</Typography>
            </div>
            <div
              className={
                "list-item-bottom-wrapper-right d-flex justify-content-end"
              }
            >
              <Button onClick={() => copyToClipboard()} variant={"primary"}>
                <Icon icon={"content_copy"} />{" "}
                <Typography
                  className={"d-inline"}
                  Tag={"h4"}
                >{`Copy `}</Typography>
              </Button>
            </div>
          </>
        )}
        {!linkGenerated && (
          <Button
            onClick={onClickGenerate}
            variant={"danger"}
            className={"mx-auto"}
          >
            {" "}
            <Typography
              Tag={"h4"}
            >{`Generate Link for "${title}" `}</Typography>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ListItemEdit;
