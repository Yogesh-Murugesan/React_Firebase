import { initializeApp } from "firebase/app";
import {
  getMessaging,
  isSupported,
  register,
  onRegistered,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);

export const messagingPromise = isSupported().then((supported) =>
  supported ? getMessaging(app) : null,
);

export async function generateToken() {
  try {
    const messaging = await messagingPromise;

    if (!messaging) {
      console.log("Firebase Messaging is not supported.");
      return null;
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission not granted.");
      return null;
    }

    const serviceWorkerRegistration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
      { scope: "/firebase-cloud-messaging-push-scope" },
    );

    // Listen before registering so the registration event isn't missed.
    const registrationId = new Promise((resolve) => {
      const unsubscribe = onRegistered(messaging, (id) => {
        unsubscribe();
        resolve(id);
      });
    });

    await register(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration,
    });

    const id = await registrationId;

    console.log("Firebase Installation ID:", id);
    return id;
  } catch (error) {
    console.error("Error registering for push notifications:", error);
    return null;
  }
}
