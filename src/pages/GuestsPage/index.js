/*
 * File: index.js
 * File Created: Monday, 31st August 2020 3:04:45 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Monday, 31st August 2020 3:04:45 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useReactPWAInstall } from "react-pwa-install";

import PageTemplate from "../../components/templates/BlankTemplate";

import SearchBar from "../../components/organisms/SearchBar";
import ResultsBox from "../../components/organisms/ResultsBox";
import ListItem from "../../components/molecules/ListItem";

import "./styles.scss";
import Globals from "../../constants/Globals";

import api from "../../api";
import _ from "lodash";

const source = _.get(api, "guests");

const GuestPage = () => {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const [result, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filterTxt, setFilterText] = useState("");

  const handleClick = () => {
    pwaInstall({
      title: "Install Wedding Planner App",
      logo: "/logo192.png",
      description: "You can install the Wedding Planner App ",
    })
      .then(() =>
        alert("App installed successfully or instructions for install shown")
      )
      .catch(() => {});
  };

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
    console.log("filtered values", ar_filter_values);
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
      <ListItem
        id={`result_item${i}`}
        key={`result_item${i}`}
        inviteMode={v.inviteMode}
        title={v["name"]}
        subTitle={v["nickName"]}
        tags={[v.tag1, v.tag2, v.tag3]}
        tableNo={v.tableNo}
        seats={v.seats}
        side={v.side}
      />
    );
  };

  const res = FilteredResult();
  return (
    <PageTemplate page_name={"guests-update"}>
      <Container className={"py-3"}>
        <Row>
          <Col>
            {/* {supported() && !isInstalled() && (
              <Button
                variant="secondary"
                className={"mb-2"}
                size="lg"
                block
                onClick={handleClick}
              >
                Install app
              </Button>
            )} */}
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

export default GuestPage;
