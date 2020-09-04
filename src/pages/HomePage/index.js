/*
 * File: index.js
 * File Created: Monday, 31st August 2020 3:04:52 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Monday, 31st August 2020 3:04:52 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import { Image, Container, Row, Col } from "react-bootstrap";
import PageTemplate from "../../components/templates/BlankTemplate";
import "./styles.scss";

const HomePage = () => {
  return (
    <PageTemplate page_name={"home"}>
      <Container className={" h-100"}>
        <Row
          className={"d-flex justify-content align-items-center vh-100 mx-auto"}
        >
          <Col className={"logo"}></Col>
        </Row>
      </Container>
    </PageTemplate>
  );
};

export default HomePage;
