// Import the functions you need from the SDKs you need
import admin from "firebase-admin";
import { getStorage } from "firebase-admin/storage";
import {
  getApp as getAppClient,
  getApps,
  initializeApp as initializeAppClient,
} from "firebase/app";

const privateKey = JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY || "");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseClientConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.FIREBASE_APP_ID || "",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "",
};

const firebaseAdminConfig = {
  clientEmail: process.env.FIREBASE_ADMIN_EMAIL || "",
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n') || "",
  projectId: process.env.FIREBASE_PROJECT_ID || "",
};

// Initialize Firebase;

export const firebaseClient = getApps().length
  ? getAppClient("client")
  : initializeAppClient(firebaseClientConfig, "client");

export const firebaseAdmin = admin.apps.length
  ? admin.app("admin")
  : admin.initializeApp(
      {
        credential: admin.credential.cert(firebaseAdminConfig),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
      },
      "admin"
    );

export const firebaseDb = firebaseAdmin.firestore();
export const firebaseStorage = getStorage(firebaseAdmin).bucket();
