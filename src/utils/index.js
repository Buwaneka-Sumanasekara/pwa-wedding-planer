/*
 * File: index.js
 * File Created: Friday, 11th September 2020 3:57:51 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Friday, 11th September 2020 3:57:51 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */
import * as _ from "lodash";
import Globals from "../constants/Globals";

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

const FilterByArrival = (data = [], type = "") => {
  const result = data.filter((v) => {
    if (type === Globals.ResultsModes.ARRIVED) {
      return v.attendedCount > 0;
    }
    if (type === Globals.ResultsModes.NOT_ARRIVED) {
      return v.attendedCount === 0;
    } else {
      return true;
    }
  });
  return result;
};

const FilterByInvited = (data = [], type = "") => {
  const result = data.filter((v) => {
    if (type === Globals.ResultsModes_invited.INVITED) {
      return v.linkGenerated === true;
    } else if (type === Globals.ResultsModes_invited.NOT_INVITED) {
      return v.linkGenerated === false;
    }
    return true;
  });
  return result;
};

const MakeMakeFilterValuesToReqBody = (ar) => {
  const result = ar.reduce((map, obj) => {
    map[obj.key] = obj.value.id;
    return map;
  }, {});
  return result;
};

const getUniqueArray = (ar, key) => {
  return _.uniqBy(ar, key);
};

const modifyArray = (ar, search_key, newObj) => {
  const mdar = ar;

  const index = _.findIndex(mdar, (o) => {
    return o[search_key] == newObj[search_key];
  });

  // Replace item at index using native splice
  if (index > -1) {
    const upObj = { ...mdar[index], ...newObj };
    console.log("mod", upObj);
    mdar.splice(index, 1, upObj);
  }
  return mdar;
};

const getGuestFullName = (guest) => {
  let prefix = "";
  let sufix = "";
  const InviteModes = Globals.InviteMode;
  const GuestInviteMode = guest.inviteMode;

  if (
    GuestInviteMode === InviteModes.MR ||
    GuestInviteMode === InviteModes.MS ||
    GuestInviteMode === InviteModes.MRS ||
    GuestInviteMode === InviteModes.MR_MRS
  ) {
    prefix = `${getTitleCase(GuestInviteMode.toLowerCase())}.`;
  } else {
    sufix = " & Family";
  }
  return `${prefix} ${guest.name} ${sufix}`;
};

const getTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};
export default {
  FilterByText: FilterByText,
  MakeFilterValuesToReqBody: MakeMakeFilterValuesToReqBody,
  getUniqueArray: getUniqueArray,
  modifyArray: modifyArray,
  getGuestFullName: getGuestFullName,
  getTitleCase: getTitleCase,
  FilterByArrival: FilterByArrival,
  FilterByInvited: FilterByInvited,
};
