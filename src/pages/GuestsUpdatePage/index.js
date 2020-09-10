/*
 * File: index.js
 * File Created: Monday, 31st August 2020 3:04:58 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Monday, 31st August 2020 3:04:58 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PageTemplate from "../../components/templates/BlankTemplate";

import SearchBar from "../../components/organisms/SearchBar";
import ResultsBox from "../../components/organisms/ResultsBox";
import ListItemEdit from "../../components/molecules/ListItemEdit";

import "./styles.scss";
import Globals from "../../constants/Globals";

import api from "../../api";
import _ from "lodash";

const source_guests = _.get(api, "guests");
const source_invitations = _.get(api, "invitation");

const GuestUpdatePage = () => {
  const [result, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filterTxt, setFilterText] = useState("");
  const [filterValues, setfilterValues] = useState([]);

  useEffect(() => {
    FilterGuestAPI();
  }, [filterValues]);

  const FilterGuestAPI = (showLoading = true) => {
    const req = Globals.FilterValuesToReqBody(filterValues);
    if (source_guests) {
      setLoading(showLoading);
      source_guests
        .filterGuests(req)
        .then((res) => {
          console.log("res", res);
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
    console.log("filter changed", ar_filter_values);
    setfilterValues(ar_filter_values);
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

  const handleOnGenerateLink = (guestId) => {
    setLoading(true);
    source_invitations
      .createInvitation({ guestId: guestId })
      .then((res) => {
        console.log(res);
        setTimeout(() => FilterGuestAPI(), 3000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const renderResultItem = (v, i) => {
    return (
      <ListItemEdit
        id={`result_item${i}`}
        key={`result_item${i}`}
        inviteMode={v.inviteMode}
        title={v["name"]}
        subTitle={v["nickName"]}
        tags={[v.tag1, v.tag2, v.tag3]}
        tableNo={v.tableNo}
        seats={v.seats}
        refCode={v.refCode}
        linkGenerated={v.linkGenerated}
        onClickGenerate={() => handleOnGenerateLink(v.id)}
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
