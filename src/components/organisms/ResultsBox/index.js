/*
 * File: index.js
 * File Created: Saturday, 5th September 2020 5:56:10 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 5th September 2020 5:56:10 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import React from "react";
import LoadingItem from "../../atoms/LoadingItem";

import "./styles.scss";

const ResultBox = (props) => {
  const {
    isLoading = false,
    ardata = [],
    renderItem = (value, i) => {
      return <div>{""}</div>;
    },
  } = props;
  return (
    <>
      {isLoading && <LoadingItem isLoading={true} />}
      {!isLoading && (
        <>
          <div>{`Results Found ( ${ardata.length} )`}</div>
          {ardata.map((value, i) => {
            return renderItem(value, i);
          })}
        </>
      )}
    </>
  );
};

export default ResultBox;
