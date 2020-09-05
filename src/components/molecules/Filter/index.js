/*
 * File: index.js
 * File Created: Saturday, 5th September 2020 6:59:40 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 5th September 2020 6:59:41 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import { Modal, Accordion } from "react-bootstrap";
import Icon from "../../atoms/Icon";
import FilterSection from "../../atoms/FilterSection";

import "./styles.scss";

const Filter = (props) => {
  const {
    filters = [],
    onChangeFilter = () => {},
    show,
    onClose,
    onChange,
  } = props;

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{"Filters"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Accordion defaultActiveKey={""}>
          {filters.map((value, i) => {
            return (
              <FilterSection
                key={`filterSection_${i}`}
                data={value}
                onSelectTagChange={(v) => onChangeFilter(v)}
              />
            );
          })}
        </Accordion>
      </Modal.Body>
    </Modal>
  );
};

export default Filter;
