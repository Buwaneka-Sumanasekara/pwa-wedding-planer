/*
 * File: invitations.js
 * File Created: Saturday, 5th September 2020 12:17:20 am
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 5th September 2020 12:17:20 am
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

export default (axios, base) => ({
  getSpecificInvitation: (data) => {
    return axios.get(`${base}/${data.code}`);
  },
});
