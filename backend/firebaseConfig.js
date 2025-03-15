import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCYkn9zCEbLpAs5Tu65JZfqyjm2MYRJDDA",
  authDomain: "gj-messenger.firebaseapp.com",
  projectId: "gj-messenger",
  storageBucket: "gj-messenger.firebasestorage.app",
  messagingSenderId: "425101570775",
  appId: "1:425101570775:web:e5a86b185020b8aed3f692",
  measurementId: "G-Y9J0KJFVF4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
