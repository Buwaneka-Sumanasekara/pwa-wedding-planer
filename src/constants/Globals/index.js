/*
 * File: index.js
 * File Created: Saturday, 5th September 2020 12:46:36 am
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 5th September 2020 12:46:37 am
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

const InviteMode = {
  FAMILY: "FAMILY",
  MR: "MR",
  MS: "MS",
  MR_MRS: "MR & MRS",
  MRS: "MRS",
};

const FilterByText = (data = [], txt = "", key = "name", key2 = "nickName") => {
  const result = data.filter((v) => {
    if (v[key] !== undefined) {
      const str = `${v[key]}`.toLowerCase();
      if (str.includes(txt.toLowerCase())) {
        return true;
      } else if (v[key2] !== undefined) {
        const str = `${v[key2]}`.toLowerCase();
        return str.includes(txt.toLowerCase());
      } else {
        return false;
      }
    } else {
      return true;
    }
  });
  return result;
};
const FilterValuesToReqBody = (ar) => {
  const result = ar.reduce((map, obj) => {
    map[obj.key] = obj.value.id;
    return map;
  }, {});
  return result;
};

export default {
  InviteMode: InviteMode,
  FilterByText: FilterByText,
  FilterValuesToReqBody: FilterValuesToReqBody,
};
