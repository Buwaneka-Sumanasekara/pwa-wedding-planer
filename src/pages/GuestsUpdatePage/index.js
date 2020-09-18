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
import ListItemEdit from "../../components/molecules/ListItemEdit";

import "./styles.scss";
import Globals from "../../constants/Globals";
import Utils from "../../utils";

import api from "../../api";
import _ from "lodash";

const ResultsModes_invited = Globals.ResultsModes_invited;

const source_guests = _.get(api, "guests");
const source_invitations = _.get(api, "invitation");

const GuestUpdatePage = () => {
  const [result, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filterTxt, setFilterText] = useState("");
  const [filterValues, setfilterValues] = useState([]);
  const [Invited, setInvitedMode] = useState("");

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

  const markAsInvited = (guest) => {
    if (source_guests !== null) {
      setLoading(true);
      source_guests
        .updateGuest(guest)
        .then((res) => {
          const ar = Utils.modifyArray(result, "id", guest);
          setResults(ar);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onInputChange = (txt) => {
    setFilterText(txt);
  };

  const FilteredResult = () => {
    let filtered_res = Utils.FilterByText(
      result,
      filterTxt,
      "name",
      "nickName"
    );

    filtered_res = Utils.FilterByInvited(filtered_res, Invited);

    return filtered_res;
  };

  const handleOnGenerateLink = (guestId) => {
    setLoading(true);
    source_invitations
      .createInvitation({ guestId: guestId })
      .then((res) => {
        console.log(res);
        const ar = Utils.modifyArray(result, "id", res.data["data"]);
        setResults(ar);
        console.log("upar", ar);
        setLoading(false);
        //setTimeout(() => FilterGuestAPI(false), 3000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const renderResultItem = (v, i) => {
    //console.log(v);
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
        side={v.side}
        contact1={v.contact1}
        contact2={v.contact2}
        address={v.address}
        invited={v.invited}
        guestObj={v}
        markAsInvited={(guest) => markAsInvited(guest)}
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
        <Row>
          <Col>
            <marquee>
              <small>{"Mark checked after given the invitation"}</small>
            </marquee>
          </Col>
        </Row>
        {!isLoading && (
          <Row className={"py-2"}>
            <Col>
              <ButtonGroup size="sm" toggle>
                <ToggleButton
                  variant="secondary"
                  type="radio"
                  checked={Invited === ResultsModes_invited.ALL}
                  value={ResultsModes_invited.ALL}
                  onChange={() => setInvitedMode(ResultsModes_invited.ALL)}
                >
                  All
                </ToggleButton>
                <ToggleButton
                  variant="secondary"
                  type="radio"
                  checked={Invited === ResultsModes_invited.INVITED}
                  value={ResultsModes_invited.INVITED}
                  onChange={() => setInvitedMode(ResultsModes_invited.INVITED)}
                >
                  Invited
                </ToggleButton>
                <ToggleButton
                  variant="secondary"
                  type="radio"
                  checked={Invited === ResultsModes_invited.NOT_INVITED}
                  value={ResultsModes_invited.NOT_INVITED}
                  onChange={() =>
                    setInvitedMode(ResultsModes_invited.NOT_INVITED)
                  }
                >
                  Haven't Invited
                </ToggleButton>
              </ButtonGroup>
            </Col>
          </Row>
        )}
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
