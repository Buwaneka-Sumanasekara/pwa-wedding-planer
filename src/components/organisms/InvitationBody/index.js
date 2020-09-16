/*
 * File: index.js
 * File Created: Saturday, 5th September 2020 4:59:51 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 5th September 2020 4:59:51 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */
import React from "react";
import { Image, Container, Row, Col, Button, Alert } from "react-bootstrap";

import Typography from "../../atoms/Typography";
import Icon from "../../atoms/Icon";
import Globals from "../../../constants/Globals";

import "./styles.scss";

const InvitationBody = (props) => {
  const {
    GuestInfo,
    Invitation,
    onAcceptDecline = () => {},
    onRequestChange = () => {},
  } = props;
  const _handleGetDirections = () => {
    //https://www.google.com/maps/dir//Saminro%20Grand%20Palace,%20287%20Makola%20Rd,%20Kiribathgoda
    window.location.href =
      "https://www.google.com/maps/dir//Saminro%20Grand%20Palace,%20287%20Makola%20Rd,%20Kiribathgoda";
  };

  const InviteModes = Globals.InviteMode;

  const GuestName = GuestInfo.guest.name;
  const GuestInviteMode = GuestInfo.guest.inviteMode;
  const isAccepted = Invitation.accepted;
  const AlreadMarked = Invitation.scanned;

  return (
    <div
      className={
        "invitation-body py-2 vh-100 w-100 d-flex align-items-center justify-content-center "
      }
    >
      <Container className={"text-center invitation-text-wrapper"}>
        <Row className={"top-header"}>
          <Col>
            <Typography Tag={"small"} letterSpacing={1}>
              Together with their parents
            </Typography>
          </Col>
        </Row>
        <Row className={"top-header"}>
          <Col>
            <Typography Tag={"small"}>
              Mr &amp; Mrs Dewage and Mr &amp; Mrs. Sumanasekara
            </Typography>
          </Col>
        </Row>
        <Row className={"pt-2"}>
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
        <Row className={"py-2"}>
          <Col>
            <Typography Tag={"p"} className={"guest-name"}>
              <u>
                <strong>
                  {GuestInviteMode !== InviteModes.FAMILY
                    ? `${GuestInviteMode.toLowerCase()}.`
                    : ""}
                </strong>{" "}
                {`${GuestInfo !== null ? GuestName : ""}`}{" "}
                <strong>
                  {GuestInviteMode !== InviteModes.FAMILY ? "" : " & Family"}
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
                      ? `You have a reserved table : ${GuestInfo.guest.tableNo}`
                      : ""
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
            <Typography Tag={"small"}>{"ON"}</Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Image src={"/images/date-img.png"} className={"date-img"} />
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
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => _handleGetDirections()}
            >
              <Icon icon={"location2"} /> Get Direction
            </Button>
          </Col>
        </Row>

        {AlreadMarked && (
          <Row className={"pt-2 "}>
            <Col className={"alert"}>
              <div className={"alert-marked-already  px-2 py-2"}>
                <Typography Tag={"span"}>
                  {`You have already marked as `}
                  <strong>{`${
                    isAccepted ? `attended` : `unable to come`
                  } ,`}</strong>
                </Typography>
                <Alert.Link href="#" onClick={() => onRequestChange()}>
                  {" "}
                  <Typography Tag={"span"}>
                    {`Do you want to change?`}
                  </Typography>
                </Alert.Link>
              </div>
            </Col>
          </Row>
        )}

        {!AlreadMarked && (
          <React.Fragment>
            <Row className={"px-1"}>
              <Col>
                <Typography
                  Tag={"small"}
                >{`Are you expected to join this event?`}</Typography>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => onAcceptDecline(true)}
                >
                  <Icon icon={"smile"} />{" "}
                  <Typography Tag={"span"}>{`YES`}</Typography>
                </Button>
              </Col>
              <Col>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onAcceptDecline(false)}
                >
                  <Icon icon={"sad"} />{" "}
                  <Typography Tag={"span"}>{`NO`}</Typography>
                </Button>
              </Col>
            </Row>
          </React.Fragment>
        )}
      </Container>
    </div>
  );
};

export default InvitationBody;
