/*
 * File: index.js
 * File Created: Saturday, 5th September 2020 5:39:12 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 5th September 2020 5:39:12 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import { Form, Button, ButtonGroup, Dropdown } from "react-bootstrap";
import Icon from "../../atoms/Icon";
import Typography from "../../atoms/Typography";
import FilterModal from "../../molecules/Filter";

import "./styles.scss";

import api from "../../../api";
import _ from "lodash";
const source = _.get(api, "common");

const SearchBar = (props) => {
  const {
    onSearchInputChange = () => {},
    minChars = 0,
    onFiltersChange = () => {},
  } = props;

  const [filters, setFilters] = useState([]);
  const [sides, setSides] = useState([]);
  const [ShowFilterModal, setVisibleFilterModal] = useState(false);

  const [SelectedSide, setSelectedSide] = useState({});
  const [SelectedFilters, setSelectedFilters] = useState([]);

  const [txt, setText] = useState("");

  const onChangeSide = (side) => {
    setSelectedSide(side);
    setSelectedFilters([]);
    onFiltersChange([{ key: "side", value: side, needToShow: false }]);
  };

  useEffect(() => {
    if (source) {
      source.getFilters().then((res) => {
        const ArFilters = res.data["data"];
        const side = ArFilters.find((element) => element.key === "side");
        setSelectedSide(side.values[0]);
        setSides(side.values);
        const FiltersExcept_side = ArFilters.filter(
          (obj) => obj.key !== "side"
        );
        setFilters(FiltersExcept_side);
        console.log(side.values[0]);
        onChangeSide(side.values[0]);
      });
    }
  }, []);

  const onChangeText = (e) => {
    const text = e.target.value;

    setText(text);
    if (minChars < txt.length) {
      onSearchInputChange(text);
    }
  };

  const showFilterModal = () => {
    setVisibleFilterModal(true);
  };

  const onFilterSelectedTags = (arFilters) => {
    setSelectedFilters(arFilters);
    onFiltersChange(arFilters);
  };

  const onRemoveTag = (tag) => {
    const arRemianTags = SelectedFilters.filter((v) => v.key !== tag.key);
    setSelectedFilters(arRemianTags);
    onFiltersChange(arRemianTags);
  };

  return (
    <>
      <div className={"search-component px-2"}>
        <div className="form-group">
          <Form.Control
            placeholder="Search by Name"
            value={txt}
            onChange={onChangeText}
          />
        </div>

        <div className={"py-1 d-flex justify-content-between"}>
          {filters.length > 0 &&
            SelectedSide !== undefined &&
            SelectedSide.name !== undefined && (
              <>
                <Button variant="outline-secondary" onClick={showFilterModal}>
                  <Icon icon={"filter_list_alt"} />
                </Button>
                <Dropdown
                  as={ButtonGroup}
                  variant="outline-secondary"
                  title={SelectedSide.name}
                  className={"d-flex flex-row"}
                >
                  {sides.map((value, i) => {
                    return (
                      <Dropdown.Item
                        href="#"
                        key={`filter_side${i}`}
                        onSelect={() => onChangeSide(value)}
                        eventKey={value.id}
                        active={value.id === SelectedSide.id}
                      >
                        <Typography Tag={"h4"}> {value.name}</Typography>
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown>
              </>
            )}
        </div>

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
      </div>
      {SelectedSide !== undefined && SelectedSide.name !== undefined && (
        <FilterModal
          filters={filters}
          show={ShowFilterModal}
          onClose={() => setVisibleFilterModal(false)}
          onFilterDoneFilter={(ar_filters) => onFilterSelectedTags(ar_filters)}
          side={SelectedSide.id}
        />
      )}
    </>
  );
};

export default SearchBar;
