/* global importScripts, firebase */

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyB0VXXapJPrmOkLnjM1kSI_vCLtAjJBC3w",
  authDomain: "personalos-b4b62.firebaseapp.com",
  projectId: "personalos-b4b62",
  storageBucket: "personalos-b4b62.firebasestorage.app",
  messagingSenderId: "1022925483360",
  appId: "1:1022925483360:web:19857f763ec6a5b9b5c205",
  measurementId: "G-3C4S485LRW",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background message received:", payload);

  const notificationTitle =
    payload.notification?.title || payload.data?.title || "New Notification";

  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || "",
    icon: "/firebase-logo.svg",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
