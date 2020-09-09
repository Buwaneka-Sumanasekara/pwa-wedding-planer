/*
 * File: index.js
 * File Created: Monday, 31st August 2020 3:04:45 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Monday, 31st August 2020 3:04:45 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactPWAInstallProvider, { useReactPWAInstall } from "react-pwa-install";

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
      title: "Install Web App",
      logo: "/images/logo.png",
      features: (
        <ul>
          <li>Cool feature 1</li>
          <li>Cool feature 2</li>
          <li>Even cooler feature</li>
          <li>Works offline</li>
        </ul>
      ),
      description: "This is a very good app that does a lot of useful stuff. ",
    })
      .then(() =>
        alert("App installed successfully or instructions for install shown")
      )
      .catch(() => alert("User opted out from installing"));
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
    console.log("filter changes", ar_filter_values);
    const req = Globals.FilterValuesToReqBody(ar_filter_values);
    FilterGuestAPI(req);
  };

  const onInputChange = (txt) => {
    setFilterText(txt);
  };

  const FilteredResult = () => {
    console.log(result);
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
        key={`result_item${i}`}
        inviteMode={v.inviteMode}
        title={v["name"]}
        subTitle={v["nickName"]}
        tags={[v.tag1, v.tag2, v.tag3]}
        tableNo={v.tableNo}
        seats={v.seats}
      />
    );
  };

  const res = FilteredResult();
  return (
    <ReactPWAInstallProvider enableLogging>
      <PageTemplate page_name={"guests-update"}>
        {supported && !isInstalled() && (
          <button type="button" onClick={handleClick}>
            Install App
          </button>
        )}

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
    </ReactPWAInstallProvider>
  );
};

export default GuestPage;
