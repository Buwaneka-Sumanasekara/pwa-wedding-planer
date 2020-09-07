/*
 * File: index.js
 * File Created: Saturday, 5th September 2020 5:56:10 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 5th September 2020 5:56:10 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import {
  Image,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import Icon from "../../atoms/Icon";

import "./styles.scss";

const ResultBox = (props) => {
  const { ardata = [], ItemComponent = "div", key = "i" } = props;
  return (
    <>
      {ardata.map((value, i) => {
        return <ItemComponent key={`${key}${i}`} data={value} />;
      })}
    </>
  );
};

export default ResultBox;
