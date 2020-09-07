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
import { Image, Container, Row, Col } from "react-bootstrap";
import PageTemplate from "../../components/templates/BlankTemplate";

import SearchBar from "../../components/organisms/SearchBar";
import ResultsBox from "../../components/organisms/ResultsBox";

import "./styles.scss";

const GuestUpdatePage = () => {
  const { result, setResults } = useState([]);

  return (
    <PageTemplate page_name={"guests-update"}>
      <div className={"py-3"}>
        <Row>
          <Col>
            <SearchBar />
          </Col>
        </Row>
        <Row className={"py-3 px-5"}>
          <Col>
            <ResultsBox ardata={result} />
          </Col>
        </Row>
      </div>
    </PageTemplate>
  );
};

export default GuestUpdatePage;
