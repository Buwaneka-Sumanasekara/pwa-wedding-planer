/*
 * File: index.js
 * File Created: Friday, 11th September 2020 3:38:48 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Friday, 11th September 2020 3:38:48 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Icon from "../../atoms/Icon";
import Typography from "../../atoms/Typography";

import Utils from "../../../utils";

import "./styles.scss";

const GuestCountUpdateModal = (props) => {
  const {
    show = false,
    guest = null,
    onConfirmCount = () => {},
    onClose = () => {},
  } = props;

  const [count, setCount] = useState(2);

  useEffect(() => {
    if (guest !== null) {
      setCount(guest.attendedCount);
    }
  }, [guest]);

  const _onConfirmCount = () => {
    if (guest !== null) {
      const updatedGuest = { ...guest, attendedCount: count };
      onConfirmCount(updatedGuest);
    }
  };

  const _onChange = (e) => {};

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{"Mark Arival"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={"mx-auto text-center"}>
        {guest !== null && (
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Typography Tag={"h2"}>{`${Utils.getGuestFullName(
                guest
              )}`}</Typography>
              <Typography Tag={"h3"}>{`Seats`}</Typography>
              <Typography Tag={"h4"}>{`${guest.seats}`}</Typography>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="text"
                placeholder="Arrived count"
                value={count}
                onChange={_onChange}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => _onConfirmCount()}> {"Update"}</Button>
        <Button onClick={() => onClose()} variant="secondary">
          {" "}
          {"Cancel"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GuestCountUpdateModal;
