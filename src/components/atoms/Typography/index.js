/*
 * File: index.js
 * File Created: Friday, 4th September 2020 10:19:47 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Friday, 4th September 2020 10:19:47 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */
import React from "react";
import "./style.scss";
import clsx from "clsx";

const Typography = (props) => {
  const { children, Tag = "p", className, letterSpacing = 0 } = props;
  return (
    <Tag
      className={clsx(
        className,
        letterSpacing && `letter-spacing-${letterSpacing}`
      )}
    >
      {children}
    </Tag>
  );
};

export default Typography;
