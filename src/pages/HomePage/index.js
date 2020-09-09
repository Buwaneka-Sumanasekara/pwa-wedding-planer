/*
 * File: index.js
 * File Created: Monday, 31st August 2020 3:04:52 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Monday, 31st August 2020 3:04:52 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import React from "react";
import { useReactPWAInstall } from "react-pwa-install";
import { Container, Row, Col, Nav } from "react-bootstrap";
import clsx from "clsx";
import { Link } from "react-router-dom";
import PageTemplate from "../../components/templates/BlankTemplate";
import "./styles.scss";

const HomePage = () => {
  console.log(window.location.origin);
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  return (
    <PageTemplate page_name={"home"}>
      <Container className={" h-100"}>
        <Row
          className={clsx(
            "d-flex justify-content align-items-center  mx-auto",
            supported() && isInstalled() ? "" : "vh-100"
          )}
        >
          <Col className={"logo col-12"}></Col>
          <Col className={"col-12 text-center"}>
            {supported() && !isInstalled() && (
              <Nav className="btn btn-primary flex-column">
                <Nav.Link as={Link} to="/guests" eventKey="guests">
                  {"Check Guests"}
                </Nav.Link>
              </Nav>
            )}
          </Col>
        </Row>
      </Container>
    </PageTemplate>
  );
};

export default HomePage;
