/*
 * File: init-firebase.js
 * File Created: Saturday, 12th September 2020 8:45:53 am
 * Author: Buwaneka (buwanekasumanasekara@gmail.com)
 * -----
 * Last Modified: Saturday, 12th September 2020 8:45:53 am
 * Modified By: Buwaneka (buwanekasumanasekara@gmail.com>)
 * --------------------------------------------------------------
 */
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/messaging";

const prodConfig = {
  apiKey: "AIzaSyA5iZ4BOCXVsRpFO7lkQHs41nb1FPHbR6M",
  authDomain: "wedding-planer-517fe.firebaseapp.com",
  databaseURL: "https://wedding-planer-517fe.firebaseio.com",
  projectId: "wedding-planer-517fe",
  storageBucket: "wedding-planer-517fe.appspot.com",
  messagingSenderId: "870637012637",
  appId: "1:870637012637:web:fc7ff9a2f0d202e023f674",
  measurementId: "G-CW7VGBDGYS",
};

const config = prodConfig;

console.log(`Mode:${process.env.NODE_ENV}`);
console.log(`System init as #${JSON.stringify(config)}#`);

firebase.initializeApp(config);

const database = firebase.database();

let messaging = null;
try {
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
    if (process.env.NODE_ENV === "production") {
      messaging.usePublicVapidKey(
        "BFXAY4O1TFz7NOzz7qdzMr6f8WSLVfa0MyKCKH-DNAOI_9JOt7vOixxFUCXkS6d_BuEwoWToRG13I2EZiBJ436w"
      );
    } else {
      messaging.usePublicVapidKey(
        "BL_8IFwrAbN4b0ycQ_haJ2fIRt2VSG8wiglsyOsdd4w0ZdnaOB4SenyKh7OOOn1bbAmmqDxoXsNERL_LgyQMRQA"
      );
    }
  } else {
  }
} catch (error) {}

let serverKey = "";

let topic = "wedding-planner-common-notif";

export { firebase, database, messaging, serverKey, topic };
