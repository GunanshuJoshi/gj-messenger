import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { configDotenv } from "dotenv";
configDotenv();
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "gj-messenger.firebaseapp.com",
  projectId: "gj-messenger",
  storageBucket: "gj-messenger.firebasestorage.app",
  messagingSenderId: "425101570775",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-Y9J0KJFVF4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
