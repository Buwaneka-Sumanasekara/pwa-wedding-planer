/*
 * File: index.js
 * File Created: Wednesday, 9th September 2020 7:20:08 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Wednesday, 9th September 2020 7:20:08 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */
import React from "react";
import { Row, Col, Spinner } from "react-bootstrap";

import Typography from "../../atoms/Typography";
import "./style.scss";

const LoadingItem = (props) => {
  const { isLoading = false, LoadingMessage = "" } = props;
  return (
    <>
      {isLoading && (
        <div className={"vh-100 wrapper-loading"}>
          <Row className="row d-flex justify-content-center align-items-center vh-100">
            <Col md className={"text-center"}>
              <div className={"mx-auto w-50 logo"}></div>
              <Spinner animation="border" variant="primary" />
              <Typography Tag={"h2"}>{LoadingMessage}</Typography>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default LoadingItem;
