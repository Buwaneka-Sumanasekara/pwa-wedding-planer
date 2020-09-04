/*
 * File: index.js
 * File Created: Friday, 4th September 2020 8:47:16 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Friday, 4th September 2020 8:47:16 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */
import React, { useState, useEffect } from "react";
import { Image, Container, Row, Col } from "react-bootstrap";
import PageTemplate from "../../components/templates/BlankTemplate";
import Typography from "../../components/atoms/Typography";
import "./styles.scss";

const InvitationBody = () => {
  return (
    <div
      className={
        "invitation-body px-5 py-5 vh-100 w-100 d-flex align-items-center justify-content-center "
      }
    >
      <Container className={"text-center invitation-text-wrapper"}>
        <Row>
          <Col>
            <Typography Tag={"small"} letterSpacing={1}>
              Together with their parents
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography Tag={"small"}>
              Mr &amp; Mrs Dewage and Mr &amp; Mrs. Sumanasekara
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography Tag={"h2"}>Sulari</Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography Tag={"h3"}>&amp;</Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography Tag={"h2"}>Buwaneka</Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography Tag={"small"}>Have much plesure in inviting</Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography Tag={"p"}>
              <u>{"name goes here"}</u>
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography Tag={"small"}>{"To their Wedding Ceromony"}</Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography Tag={"small"} className={"mt-2"}>
              {"ON"}
            </Typography>
          </Col>
        </Row>
        <Row>
          {/* <Col className={"d-flex justify-content-center ml-n3 "}>
                    <Typography Tag={"h4"} className="d-inline pt-2">OCTOBER</Typography>
                    <Typography Tag={"h1"} className="d-inline pl-2 pr-3">25</Typography>
                    <Typography Tag={"h4"} className="d-inline pt-2">2020</Typography>
                </Col> */}
          <Col>
            <Image src={"/images/date-img.png"} className={"date-img"} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography Tag={"small"} className={"font-weight-bold"}>
              {"SUNDAY"}
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography Tag={"small"} className={"mt-2"}>
              {"AT"}
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography
              letterSpacing={1}
              Tag={"small"}
              className={"font-weight-bold"}
            >
              {"SAMINRO GRAND PALACE"}
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography Tag={"small"} className={"font-smaller"}>
              {"PORUWA CEREMONEY AT 10:00 AM"}
            </Typography>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const InvitationPage = () => {
  return (
    <PageTemplate page_name={"invitation"}>
      <div className={"background-img vh-100  d-lg-none d-xl-none"}>
        {InvitationBody()}
      </div>
      <div className={"large-screen  d-none d-lg-block d-xl-block "}>
        <div className={"background-img vh-100 "}>{InvitationBody()}</div>
      </div>
    </PageTemplate>
  );
};

export default InvitationPage;
