import React from "react";
import "./style.scss";

const Icon = (props) => {
  const { icon, filled } = props;
  const name = `icon-${icon}` + (filled ? "_filled" : "");
  return <i className={name}></i>;
};

export default Icon;
