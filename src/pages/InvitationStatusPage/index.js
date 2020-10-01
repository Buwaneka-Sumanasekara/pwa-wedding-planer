/*
 * File: index.js
 * File Created: Monday, 21st September 2020 2:28:32 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Monday, 21st September 2020 2:28:32 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  ToggleButton,
} from "react-bootstrap";
import PageTemplate from "../../components/templates/BlankTemplate";

import SearchBar from "../../components/organisms/SearchBar";
import ResultsBox from "../../components/organisms/ResultsBox";
import ListItem from "../../components/molecules/ListItem";
import GuestCountUpdateModal from "../../components/molecules/GuestCountUpdateModal";

import "./styles.scss";
import Globals from "../../constants/Globals";
import Utils from "../../utils";

import api from "../../api";
import _ from "lodash";

const source_guests = _.get(api, "guests");

const ResultsModes = Globals.ResultsModes;

const InvitationStatus = () => {
  const [result, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filterTxt, setFilterText] = useState("");
  const [filterValues, setfilterValues] = useState([]);

  useEffect(() => {
    FilterGuestAPI();
  }, [filterValues]);

  const FilterGuestAPI = (showLoading = true) => {
    const req = Utils.MakeFilterValuesToReqBody(filterValues);
    if (source_guests && filterValues.length > 0) {
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
    setfilterValues(ar_filter_values);
  };

  const FilteredResult = () => {
    let filtered_res = Utils.FilterByText(
      result,
      filterTxt,
      "name",
      "nickName"
    );

    filtered_res = Utils.FilterByArrival(filtered_res, ArrivalMode);
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
        refCode={v.refCode}
        linkGenerated={v.linkGenerated}
        side={v.side}
        attendedCount={v.attendedCount}
        onClickItem={() => onPressListItem(v)}
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

        {!isLoading && (
          <Row className={"py-2"}>
            <Col>
              <ButtonGroup size="sm" toggle>
                <ToggleButton
                  variant="secondary"
                  type="radio"
                  checked={ArrivalMode === ResultsModes.ALL}
                  value={ResultsModes.ALL}
                  onChange={() => setArrivalMode(ResultsModes.ALL)}
                >
                  All
                </ToggleButton>
                <ToggleButton
                  variant="secondary"
                  type="radio"
                  checked={ArrivalMode === ResultsModes.ARRIVED}
                  value={ResultsModes.ARRIVED}
                  onChange={() => setArrivalMode(ResultsModes.ARRIVED)}
                >
                  Approved
                </ToggleButton>
                <ToggleButton
                  variant="secondary"
                  type="radio"
                  checked={ArrivalMode === ResultsModes.NOT_ARRIVED}
                  value={ResultsModes.NOT_ARRIVED}
                  onChange={() => setArrivalMode(ResultsModes.NOT_ARRIVED)}
                >
                  Not Responded
                </ToggleButton>
                <ToggleButton
                  variant="secondary"
                  type="radio"
                  checked={ArrivalMode === ResultsModes.NOT_ARRIVED}
                  value={ResultsModes.NOT_ARRIVED}
                  onChange={() => setArrivalMode(ResultsModes.NOT_ARRIVED)}
                >
                  Not Approved
                </ToggleButton>
              </ButtonGroup>
            </Col>
          </Row>
        )}

        <Row>
          <Col>
            <ResultsBox
              ardata={res}
              renderItem={(v, i) => renderResultItem(v, i)}
              isLoading={isLoading}
            />
          </Col>
        </Row>
      </Container>
      <GuestCountUpdateModal
        show={ShowModal}
        onClose={() => setShowModal(false)}
        guest={SelectedGuest}
        onConfirmCount={(guest) => onCountUpdate(guest)}
        isDisableModal={isDisableModal}
      />
    </PageTemplate>
  );
};

export default InvitationStatus;
