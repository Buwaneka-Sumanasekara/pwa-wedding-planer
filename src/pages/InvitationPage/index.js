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
import InvitationBody from "../../components/organisms/InvitationBody";

import Globals from "../../constants/Globals";

import "./styles.scss";

import api from "../../api";
import _ from "lodash";

const source = _.get(api, "invitation");

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
