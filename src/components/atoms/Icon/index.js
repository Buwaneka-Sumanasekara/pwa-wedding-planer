import React from "react";
import clsx from "clsx";
import "./style.scss";

const Icon = (props) => {
  const { icon, filled, className } = props;
  const name = clsx(`icon-${icon}` + (filled ? "_filled" : ""), className);
  return <i className={name}></i>;
};

export default Icon;
