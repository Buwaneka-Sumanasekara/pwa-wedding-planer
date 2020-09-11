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
import {
  Modal,
  Form,
  Button,
  Badge,
  FormControl,
  InputGroup,
} from "react-bootstrap";
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
    maxLength = 2,
    isDisableModal = false,
  } = props;

  const [count, setCount] = useState(0);
  const [tags, setTags] = useState([]);
  const [isDisable, setDisable] = useState(false);

  useEffect(() => {
    if (guest !== null) {
      setCount(guest.attendedCount > 0 ? guest.attendedCount : guest.seats);
      setTags([guest.tag1, guest.tag2, guest.tag3]);
    }
  }, [guest]);

  useEffect(() => {
    setDisable(isDisableModal);
  }, [isDisableModal]);

  const _onConfirmCount = () => {
    if (guest !== null) {
      if (count !== "" && parseInt(count) > -1) {
        const updatedGuest = { ...guest, attendedCount: parseInt(count) };
        onConfirmCount(updatedGuest);
      }
    }
  };

  const _onResetCount = () => {
    if (guest !== null) {
      const updatedGuest = { ...guest, attendedCount: parseInt(0) };
      onConfirmCount(updatedGuest);
    }
  };

  const _onChange = (e) => {
    const val = e.target.value;
    if (maxLength && val.length > maxLength) {
      return;
    } else if (Number.isNaN(val)) {
      return;
    }
    setCount && setCount(val);
  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{"Mark Arrival"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={"mx-2 text-center"}>
        {guest !== null && (
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Typography Tag={"h2"}>{`${Utils.getGuestFullName(
                guest
              )}`}</Typography>
              <Typography Tag={"h3"}>{`Seats`}</Typography>
              <Typography Tag={"h4"}>{`${guest.seats}`}</Typography>

              <Typography Tag={"h3"}>{`Table No`}</Typography>
              <Typography Tag={"h4"}>{`${guest.tableNo}`}</Typography>

              {tags.map((v, i) => (
                <Badge
                  key={`guesttags${i}`}
                  className={"mr-1"}
                  variant="primary"
                >
                  {v}
                </Badge>
              ))}
            </Form.Group>

            <Form.Group className={"px-5"} controlId="formBasicPassword">
              <InputGroup className="mb-3">
                <FormControl
                  type="text"
                  placeholder="Arrived count"
                  value={count}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength="2"
                  onChange={_onChange}
                  onInput={maxLengthCheck}
                  disabled={isDisable}
                />
                <InputGroup.Append>
                  <Button
                    disabled={isDisable}
                    variant="outline-secondary"
                    onClick={() => _onResetCount()}
                  >
                    Reset
                  </Button>
                </InputGroup.Append>
              </InputGroup>
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
