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

  console.log("marked", AlreadMarked);

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
                    GuestInfo.guest.tableNo !== "" &&
                    GuestInfo.guest.tableNo !== 0
                      ? `Table No: ${GuestInfo.guest.tableNo}`
                      : "- Your Table-no will arrange soon -"
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
          <Row className={"pt-2"}>
            <Col>
              <Alert variant={"light"}>
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
              </Alert>
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

const InvitationPage = () => {
  const { code } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [LoadingMessage, setLoadingMessage] = useState(
    "Loading Your Invitation.."
  );
  const [notFound, setNotFound] = useState(false);
  const [GuestInfo, setGuestInfo] = useState(null);
  const [Invitation, setInvitation] = useState(null);

  useEffect(() => {
    if (source) {
      setLoading(true);
      source.getSpecificInvitation({ code: code }).then((res) => {
        console.log(res);
        setLoading(false);
        if (res.data["data"] !== undefined) {
          setGuestInfo(res.data["data"]);
          setInvitation(res.data["data"]);
        } else {
          setNotFound(true);
        }
      });
    }
  }, []);

  const actionAcceptReject = (isAccepted) => {
    if (source) {
      setLoadingMessage("Processing..");
      setLoading(true);
      source
        .actionAcceptDecline({ code: code, isAccepted: isAccepted })
        .then((res) => {
          setLoading(false);
          if (res.data["data"] !== undefined) {
            setInvitation(res.data["data"]);
          }
        });
    }
  };
  const onRequestChange = () => {
    const invObj = Invitation;
    invObj.scanned = false;

    setInvitation({ ...invObj });
  };
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
              <Typography Tag={"h2"}>{LoadingMessage}</Typography>
            </Col>
          </Row>
        </div>
      )}

      {GuestInfo !== null && Invitation !== null && (
        <React.Fragment>
          <div className={"background-img vh-100  d-lg-none d-xl-none"}>
            {/* {InvitationBody(GuestInfo, Invitation, actionAcceptReject,onRequestChange)} */}
            <InvitationBody
              GuestInfo={GuestInfo}
              Invitation={Invitation}
              onAcceptDecline={actionAcceptReject}
              onRequestChange={onRequestChange}
            />
          </div>
          <div className={"large-screen  d-none d-lg-block d-xl-block "}>
            <div className={"background-img vh-100 "}>
              {/* {InvitationBody(GuestInfo, Invitation, actionAcceptReject,onRequestChange)} */}
              <InvitationBody
                GuestInfo={GuestInfo}
                Invitation={Invitation}
                onAcceptDecline={actionAcceptReject}
                onRequestChange={onRequestChange}
              />
            </div>
          </div>
        </React.Fragment>
      )}
    </PageTemplate>
  );
};

export default InvitationPage;
