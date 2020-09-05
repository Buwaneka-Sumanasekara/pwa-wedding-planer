/*
 * File: index.js
 * File Created: Saturday, 5th September 2020 7:35:04 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 5th September 2020 7:35:04 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */
import React, { useState } from "react";
import clsx from "clsx";
import "./styles.scss";
import Icon from "../../atoms/Icon";
import Typography from "../../atoms/Typography";

import { Spinner, Button } from "react-bootstrap";

const DialogBox = (props) => {
  const {
    show,
    title,
    children,
    onSubmit,
    submitTitle,
    onClose,
    loading,
    hideFooter,
    hideHeader = false,
    hideClose = false,
    backDropEnable = false,
    icon = "times",
    style = {},
    className = "",
    buttonProps = { block: true },
  } = props;

  return (
    <div
      className={clsx(
        `dialog-box ${show ? "active" : "inactive"} 'fade' ${
          loading ? "loading" : ""
        }`,
        className
      )}
      onClick={backDropEnable ? onClose : () => {}}
    >
      <div className="dialog-box-wrapper" style={style}>
        {loading && (
          <div className="loader-spinner">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        {!hideHeader && (
          <div className="dialog-box-header">
            {!hideClose && (
              <a onClick={onClose} className="dialog-box-header-close">
                <Icon icon={icon} />
              </a>
            )}
            <Typography Tag={"h3"}>{title}</Typography>
          </div>
        )}
        <div className="dialog-box-body">{children}</div>
        {!hideFooter && (
          <div className="dialog-box-footer">
            <Button
              variant="primary"
              onClick={onSubmit}
              disabled={!onSubmit}
              size="lg"
              {...buttonProps}
            >
              <Typography Tag={"small"}>{submitTitle}</Typography>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogBox;
