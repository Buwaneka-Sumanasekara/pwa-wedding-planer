/*
 * File: index.js
 * File Created: Saturday, 5th September 2020 7:04:58 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 5th September 2020 7:04:58 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */
import React, { useState } from "react";
import { Card, ListGroup, Accordion } from "react-bootstrap";

import "./styles.scss";

const FilterSection = (props) => {
  const {
    data,
    DependTag = "",
    DependTagValues = [],
    onSelectTagChange = () => {},
  } = props;

  const [SelectedTag, setSelectedTag] = useState(null);

  const onChangeTag = (v) => {
    setSelectedTag(v);
    onSelectTagChange({ key: data.key, value: v });
  };

  const getFilteredTags = (ar_data) => {
    let ar = [];
    for (const dependtag_val of DependTagValues) {
      const ar_filters = ar_data.filter((v) => v[DependTag] === dependtag_val);
      ar = ar.concat(ar_filters);
    }
    return ar;
  };

  let ar_tags = [];
  if (data !== undefined && data.values !== undefined) {
    ar_tags =
      DependTag !== "" && DependTagValues.length > 0
        ? getFilteredTags(data.values)
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
                <ListGroup.Item
                  key={`key_ilter_items_${data.key}${v.id}`}
                  onClick={() => onChangeTag(v)}
                  active={
                    SelectedTag !== null ? v.id === SelectedTag.id : false
                  }
                >
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
