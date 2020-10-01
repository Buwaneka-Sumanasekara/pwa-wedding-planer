/*
 * File: index.js
 * File Created: Saturday, 12th September 2020 9:44:57 am
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 12th September 2020 9:44:58 am
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import clsx from "clsx";
import { Link } from "react-router-dom";
import PageTemplate from "../../components/templates/BlankTemplate";
import Typography from "../../components/atoms/Typography";

import { database } from "../../constants/Firebase/init-firebase";
import Utils from "../../utils";
import "./styles.scss";

const Dashboard = () => {
  const [DashboardData, setDashboardData] = useState({});

  const onDashbaordValueChange = () => {
    const starCountRef = database.ref("Dashboard");
    starCountRef.on("value", function (snapshot) {
      //updateStarCount(postElement, snapshot.val());
      const v = snapshot.val();
      console.log(v);
      setDashboardData(v);
    });
  };

  useEffect(() => {
    onDashbaordValueChange();
  }, []);

  return (
    <PageTemplate page_name={"dashboard"}>
      <Container className={" h-100"}>
        <Row
          className={
            "row d-flex justify-content-center align-items-center vh-100"
          }
        >
          <Col className={"col-12"}>
            <Row>
              <Col md className={"text-center"}>
                <h1>{"Guests"}</h1>
              </Col>
            </Row>
            <Row>
              <Col md className={"text-center"}>
                <h2>
                  {`${Utils.replaceByDefault(
                    DashboardData,
                    "Arrived"
                  )} / ${Utils.replaceByDefault(DashboardData, "Total")}`}
                </h2>
              </Col>
            </Row>
            <Row className="py-4">
              <Col md className={"text-center"}>
                <p>{`Bride's side`}</p>
                <h3>
                  {`${Utils.replaceByDefault(
                    DashboardData,
                    "Sulari_Arrived"
                  )}  / ${Utils.replaceByDefault(
                    DashboardData,
                    "Sulari_Total"
                  )} `}
                </h3>
              </Col>
            </Row>
            <Row className="py-4">
              <Col md className={"text-center"}>
                <p>{`Groom's side`}</p>
                <h3>
                  {`${Utils.replaceByDefault(
                    DashboardData,
                    "Buwaneka_Arrived"
                  )}  / ${Utils.replaceByDefault(
                    DashboardData,
                    "Buwaneka_Total"
                  )} `}
                </h3>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </PageTemplate>
  );
};

// What data from the store shall we send to the component?
const mapStateToProps = (state) => ({});

// Any actions to map to the component?
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
