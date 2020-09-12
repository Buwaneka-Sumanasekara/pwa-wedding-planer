/*
 * File: firebase.js
 * File Created: Saturday, 12th September 2020 8:53:21 am
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 12th September 2020 8:53:21 am
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */

import Globals from "../constants/Globals";
import { messaging } from "../constants/Firebase/init-firebase";

const getFCMTokenFromClient = () => {
  return messaging
    .getToken()
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      return false;
    });
};

const requestPermission = () => {
  return Notification.requestPermission()
    .then((permission) => {
      if (permission === Globals.NotificationPermType.GRANTED) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log("erorr req perm", err);
      return false;
    });
};

const onMessageListner = () => {
  messaging.onMessage(function (payload) {
    console.log("Message received. ", payload);
  });
};

export default {
  onMessageListner: onMessageListner,
  requestPermission: requestPermission,
  getFCMTokenFromClient: getFCMTokenFromClient,
};
