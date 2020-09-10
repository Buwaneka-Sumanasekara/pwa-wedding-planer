/*
 * File: index.js
 * File Created: Monday, 31st August 2020 3:04:58 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Monday, 31st August 2020 3:04:58 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PageTemplate from "../../components/templates/BlankTemplate";

import SearchBar from "../../components/organisms/SearchBar";
import ResultsBox from "../../components/organisms/ResultsBox";
import ListItemEdit from "../../components/molecules/ListItemEdit";

import "./styles.scss";
import Globals from "../../constants/Globals";

import api from "../../api";
import _ from "lodash";

const source = _.get(api, "guests");

const GuestUpdatePage = () => {
  const [result, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filterTxt, setFilterText] = useState("");

  const FilterGuestAPI = (req = {}) => {
    if (source) {
      setLoading(true);
      source
        .filterGuests(req)
        .then((res) => {
          setLoading(false);
          if (res.data["data"] !== undefined) {
            setResults(res.data["data"]);
          } else {
            setResults([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onFilterChange = (ar_filter_values) => {
    console.log("filter changes", ar_filter_values);
    const req = Globals.FilterValuesToReqBody(ar_filter_values);
    FilterGuestAPI(req);
  };

  const onInputChange = (txt) => {
    setFilterText(txt);
  };

  const FilteredResult = () => {
    const filtered_res = Globals.FilterByText(
      result,
      filterTxt,
      "name",
      "nickName"
    );
    return filtered_res;
  };

  const renderResultItem = (v, i) => {
    return (
      <ListItemEdit
        key={`result_item${i}`}
        inviteMode={v.inviteMode}
        title={v["name"]}
        subTitle={v["nickName"]}
        tags={[v.tag1, v.tag2, v.tag3]}
        tableNo={v.tableNo}
        seats={v.seats}
        refCode={v.refCode}
      />
    );
  };

  const res = FilteredResult();
  return (
    <PageTemplate page_name={"guests-update"}>
      <Container className={"py-3"}>
        <Row>
          <Col>
            <SearchBar
              onFiltersChange={(v) => onFilterChange(v)}
              onSearchInputChange={(txt) => onInputChange(txt)}
            />
          </Col>
        </Row>
        <Row className={"py-3"}>
          <Col>
            <ResultsBox
              ardata={res}
              renderItem={(v, i) => renderResultItem(v, i)}
              isLoading={isLoading}
            />
          </Col>
        </Row>
      </Container>
    </PageTemplate>
  );
};

export default GuestUpdatePage;
