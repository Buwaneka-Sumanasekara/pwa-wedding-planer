/*
 * File: index.js
 * File Created: Saturday, 5th September 2020 7:04:58 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 5th September 2020 7:04:58 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */
import React, { useState, useEffect } from "react";
import { Card, ListGroup, Accordion } from "react-bootstrap";
import Icon from "../../atoms/Icon";

import "./styles.scss";

const FilterSection = (props) => {
  const {
    data,
    DependTag = "",
    DependTagValue = "",
    onSelectTagChange = () => {},
  } = props;

  const [SelectedTag, setSelectedTag] = useState(null);

  const onChangeTag = (v) => {
    setSelectedTag(v);
    onSelectTagChange({ key: data.key, value: v });
  };

  let ar_tags = [];
  if (data !== undefined && data.values !== undefined) {
    ar_tags =
      DependTag !== "" && DependTagValue !== ""
        ? data.values.filter((v) => v[DependTag] === DependTagValue)
        : data.values;
    return (
      <Card>
        <Card.Body>
          <Accordion.Toggle as={Card.Header} variant="link" eventKey={data.key}>
            {data.descriptions}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={data.key}>
            <ListGroup>
              {ar_tags.map((v) => (
                <ListGroup.Item onClick={() => onChangeTag(v)}>
                  {v.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Accordion.Collapse>
        </Card.Body>
      </Card>
    );
  }

  return null;
};

export default FilterSection;
