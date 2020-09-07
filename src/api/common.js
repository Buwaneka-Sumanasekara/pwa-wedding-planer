/*
 * File: common.js
 * File Created: Saturday, 5th September 2020 6:14:17 pm
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 5th September 2020 6:14:17 pm
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

export default (axios, base) => ({
  getFilters: (data) => {
    return axios.get(`${base}/filters`);
  },
});
