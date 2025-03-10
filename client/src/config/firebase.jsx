import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyCYkn9zCEbLpAs5Tu65JZfqyjm2MYRJDDA",
  authDomain: "gj-messenger.firebaseapp.com",
  projectId: "gj-messenger",
  storageBucket: "gj-messenger.firebasestorage.app",
  messagingSenderId: "425101570775",
  appId: "1:425101570775:web:e5a86b185020b8aed3f692",
  measurementId: "G-Y9J0KJFVF4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

export const signup = async (username, email, password) => {
  console.log("🚀 ~ signup ~ password:", password);
  console.log("🚀 ~ signup ~ email:", email);
  console.log("🚀 ~ signup ~ username:", username);
  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    const user = data.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      dp: "",
      bio: "Hola amigos!!!",
      lastSeen: Date.now(),
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });
    return user;
  } catch (error) {
    console.log("🚀 ~ signup ~ error:", error);
    toast.error(error.message);
  }
};

export const signin = async (email, password) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);
    console.log("🚀 ~ signin ~ data:", data);
    const user = data.user;
    const res = await getDoc(doc(db, "users", user.uid));
    const userData = res.data();
    console.log("🚀 ~ signin ~ userData:", userData);
    const res2 = await getDoc(doc(db, "chats", user.uid));
    const chatData = res2.data();
    console.log("🚀 ~ signin ~ chatData:", chatData);
    return { userData, chatData };
  } catch (error) {
    console.log("🚀 ~ signin ~ error:", error);
    toast.error(error.message);
  }
};

export const updateProfile = async (userId, data) => {
  console.log("🚀 ~ updateProfile ~ userId:", userId);
  if (!userId) return;
  try {
    const res = await updateDoc(doc(db, "users", userId), data);
    console.log("🚀 ~ updateProfile ~ res:", res);
  } catch (error) {
    console.log("🚀 ~ signin ~ error:", error);
    toast.error(error.message);
  }
};
