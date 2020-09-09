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
import LoadingItem from "../../atoms/LoadingItem";

import "./styles.scss";

const ResultBox = (props) => {
  const {
    isLoading = false,
    ardata = [],
    renderItem = (value, i) => {
      return <div>{""}</div>;
    },
    key = "i",
  } = props;
  return (
    <>
      {isLoading && <LoadingItem isLoading={true} />}
      {!isLoading &&
        ardata.map((value, i) => {
          return renderItem(value, i);
        })}
    </>
  );
};

export default ResultBox;
