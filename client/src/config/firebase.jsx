import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
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
import { get, getDatabase, ref, update } from "firebase/database";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

export const signup = async (username, email, password) => {
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
    console.log("Error in signUp", error);
    toast.error(error.message);
    return "";
  }
};

export const signin = async (email, password) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);
    console.log("🚀 ~ signin ~ data:", data);
    const user = data.user;
    return user;
  } catch (error) {
    console.log("Error in signUp", error);
    toast.error(error.message);
    return "";
  }
};

export const updateProfile = async (userId, data) => {
  if (!userId) return;
  try {
    await updateDoc(doc(db, "users", userId), data);
  } catch (error) {
    console.log("Error in Update Profile: ", error);
    toast.error(error.message);
  }
};

const realTimedb = getDatabase();

export const updateLastSeen = async (userId) => {
  if (!userId) return;
  try {
    await update(ref(realTimedb, `users/${userId}`), {
      lastSeen: Date.now(),
    });
    console.log("🚀 Last Seen Updated:", new Date().toLocaleString());
  } catch (error) {
    console.log("Error in Updating Last Seen:", error);
  }
};

export const getOnlineUsers = async (userId) => {
  try {
    const userRef = ref(realTimedb, `users/${userId}`); // Reference to the user's data
    const snapshot = await get(userRef); // Fetch data
    console.log("🚀 ~ getOnlineUsers ~ snapshot:", snapshot);

    if (snapshot.exists()) {
      console.log("🚀 ~ getOnlineUsers ~ data:", snapshot.val());
      return snapshot.val(); // Return user data
    } else {
      console.log("❌ No user found");
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching online users:", error);
    return null;
  }
};
