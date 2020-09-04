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
import { useParams } from "react-router-dom";
import {
  Image,
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import PageTemplate from "../../components/templates/BlankTemplate";
import Typography from "../../components/atoms/Typography";
import Icon from "../../components/atoms/Icon";

import Globals from "../../constants/Globals";

import "./styles.scss";

import api from "../../api";
import _ from "lodash";

const source = _.get(api, "invitation");

const InvitationBody = (GuestInfo) => {
  const _handleGetDirections = () => {
    //https://www.google.com/maps/dir//Saminro%20Grand%20Palace,%20287%20Makola%20Rd,%20Kiribathgoda
    window.location.href =
      "https://www.google.com/maps/dir//Saminro%20Grand%20Palace,%20287%20Makola%20Rd,%20Kiribathgoda";
  };

  const InviteModes = Globals.InviteMode;

  const GuestName = GuestInfo.guest.name;
  const GuestInviteMode = GuestInfo.guest.inviteMode;

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
              <u>
                <strong>
                  {GuestInviteMode !== InviteModes.FAMILY
                    ? GuestInviteMode
                    : ""}
                </strong>{" "}
                {`${GuestInfo !== null ? GuestName : ""}`}{" "}
                <strong>
                  {GuestInviteMode !== InviteModes.FAMILY
                    ? GuestInviteMode
                    : " & Family"}
                </strong>
              </u>
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography Tag={"p"} className={""}>
              <mark>
                <strong>
                  {" "}
                  {`${
                    GuestInfo.guest.tableNo !== ""
                      ? `Table No: ${GuestInfo.guest.tableNo}`
                      : "-Your table no will arrange soon-"
                  }`}{" "}
                </strong>
              </mark>
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
        <Row className={"pt-3"}>
          <Col>
            <Button variant="primary" onClick={() => _handleGetDirections()}>
              <Icon icon={"info"} /> Get Direction
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const InvitationPage = () => {
  const { code } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [GuestInfo, setGuestInfo] = useState(null);

  useEffect(() => {
    setLoading(true);

    if (source) {
      source.getSpecificInvitation({ code: code }).then((res) => {
        console.log(res);
        setLoading(false);
        if (res.data["data"] !== undefined) {
          setGuestInfo(res.data["data"]);
        } else {
          setNotFound(true);
        }
      });
    }
  }, []);

  return (
    <PageTemplate page_name={"invitation"}>
      {notFound && (
        <div className={"vh-100"}>
          <Row className="row d-flex justify-content-center align-items-center vh-100">
            <Col md className={"text-center"}>
              <Alert variant="warning">
                <Alert.Heading>{"Oppz.."}</Alert.Heading>
                <Typography Tag={"h1"}>
                  {"Seems you are visited to invalid link. .."}
                </Typography>
              </Alert>
            </Col>
          </Row>
        </div>
      )}
      {isLoading && (
        <div className={"vh-100"}>
          <Row className="row d-flex justify-content-center align-items-center vh-100">
            <Col md className={"text-center"}>
              <Spinner animation="border" variant="primary" />
              <Typography Tag={"h2"}>Loading Your Invitation..</Typography>
            </Col>
          </Row>
        </div>
      )}

      {GuestInfo !== null && (
        <React.Fragment>
          <div className={"background-img vh-100  d-lg-none d-xl-none"}>
            {InvitationBody(GuestInfo)}
          </div>
          <div className={"large-screen  d-none d-lg-block d-xl-block "}>
            <div className={"background-img vh-100 "}>
              {InvitationBody(GuestInfo)}
            </div>
          </div>
        </React.Fragment>
      )}
    </PageTemplate>
  );
};

export default InvitationPage;
