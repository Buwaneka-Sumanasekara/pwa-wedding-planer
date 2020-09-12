import FirebaseUtils from "../../utils/firebase";

export function subscribeForNotifications() {
  return (dispatch) => {
    FirebaseUtils.getFCMTokenFromClient().then((token) => {
      if (token !== false) {
        sendTokenToServer(token);
      } else {
        FirebaseUtils.requestPermission()
          .then((permission_granted) => {
            dispatch(subscribeForNotifications());
          })
          .catch((err) => {
            console.log("error");
          });
      }
    });
  };
}

export function sendTokenToServer(token) {
  return (dispatch) => {
    console.log("token recieved", token);
  };
}
