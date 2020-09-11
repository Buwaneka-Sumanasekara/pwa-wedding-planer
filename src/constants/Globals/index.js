/*
 * File: index.js
 * File Created: Saturday, 5th September 2020 12:46:36 am
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 5th September 2020 12:46:37 am
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import * as _ from "lodash";

const InviteMode = {
  FAMILY: "FAMILY",
  MR: "MR",
  MS: "MS",
  MR_MRS: "MR & MRS",
  MRS: "MRS",
};

const ResultsModes = {
  ALL: "ALL",
  ARRIVED: "ARRIVED",
  NOT_ARRIVED: "NOT_ARRIVED",
};

export default {
  InviteMode: InviteMode,
  ResultsModes: ResultsModes,
};
