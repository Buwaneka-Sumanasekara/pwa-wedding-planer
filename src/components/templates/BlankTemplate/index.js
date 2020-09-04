/*
 * File: index.js
 * File Created: Friday, 4th September 2020 2:56:49 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Friday, 4th September 2020 2:56:49 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */
import React from "react";
import clsx from "clsx";

const BlankPageTemplate = (props) => {
  return (
    <div className={clsx("blank-template", `page-${props.page_name}`)}>
      <div className={"page_content"}>{props.children}</div>
    </div>
  );
};

export default BlankPageTemplate;
