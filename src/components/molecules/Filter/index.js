/*
 * File: index.js
 * File Created: Saturday, 5th September 2020 6:59:40 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 5th September 2020 6:59:41 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import React, { useState } from "react";
import { Modal, Accordion, Button } from "react-bootstrap";
import Icon from "../../atoms/Icon";
import FilterSection from "../../atoms/FilterSection";
import Typography from "../../atoms/Typography";

import "./styles.scss";

const Filter = (props) => {
  const {
    side = "",
    filters = [],
    onFilterDoneFilter = () => {},
    show,
    onClose,
  } = props;

  const [SelectedFilters, setSelectedFilters] = useState([]);

  const onConfirmFilters = () => {
    onFilterDoneFilter(SelectedFilters);
    onClose();
  };
  const onChangeFilter = (v) => {
    const curFilters = SelectedFilters.filter((value) => value.key !== v.key);
    curFilters.push(v);
    setSelectedFilters(curFilters);
  };

  const onRemoveTag = (tag) => {
    const arRemianTags = SelectedFilters.filter((v) => v.key !== tag.key);
    setSelectedFilters(arRemianTags);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{"Filters"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={"tags-wrapper py-2"}>
          {SelectedFilters.map((v, i) => (
            <Button
              key={`filter_but${i}`}
              size="sm"
              variant={"light"}
              onClick={() => onRemoveTag(v)}
            >
              <Icon icon={"price-tag"} />{" "}
              <Typography Tag={"span"}>{v.value.name}</Typography>
            </Button>
          ))}
        </div>

        <Accordion defaultActiveKey={""}>
          {filters.map((value, i) => {
            const dependValue = SelectedFilters.find(
              (ele) => ele["key"] === value.depend_on
            );
            const dependar =
              dependValue !== undefined ? [dependValue.value.id] : [];

            if (value.depend_on === "side") {
              return (
                <FilterSection
                  key={`filterSection_side${i}`}
                  data={value}
                  onSelectTagChange={(v) => onChangeFilter(v)}
                  DependTag={"side"}
                  DependTagValues={[side, "COMMON"]}
                />
              );
            }
            return (
              <FilterSection
                key={`filterSection_${i}`}
                data={value}
                onSelectTagChange={(v) => onChangeFilter(v)}
                DependTag={value.depend_on}
                DependTagValues={dependar}
              />
            );
          })}
        </Accordion>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onConfirmFilters()}> {"Filter"}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Filter;
