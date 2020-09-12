/*
 * File: index.js
 * File Created: Saturday, 12th September 2020 9:44:57 am
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 12th September 2020 9:44:58 am
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import clsx from "clsx";
import { Link } from "react-router-dom";
import PageTemplate from "../../components/templates/BlankTemplate";
import * as AppActions from "../../redux/app/action";

import "./styles.scss";

const Dashboard = () => {
  console.log(window.location.origin);

  const subscribeForNotifications = () => {};

  return (
    <PageTemplate page_name={"home"}>
      <Container className={" h-100"}>
        <Row>
          <Col className={"col-12"}>
            <Button onClick={subscribeForNotifications}>
              {"Subscribe for Notifications"}
            </Button>
          </Col>
        </Row>
      </Container>
    </PageTemplate>
  );
};

// What data from the store shall we send to the component?
const mapStateToProps = (state) => ({});

// Any actions to map to the component?
const mapDispatchToProps = {
  subscribeForNotifications: AppActions.subscribeForNotifications,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
