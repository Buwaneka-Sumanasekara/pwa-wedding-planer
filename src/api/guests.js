/*
 * File: guests.js
 * File Created: Saturday, 5th September 2020 6:05:01 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 5th September 2020 6:05:01 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

export default (axios, base) => ({
  filterGuests: (data) => {
    return axios.post(`${base}/`, data);
  },
  updateGuest: (data) => {
    return axios.put(`${base}/${data.id}`, data);
  },
});
