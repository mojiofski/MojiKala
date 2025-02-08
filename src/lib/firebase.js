import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBPoIsElQfbMGbWRfJwtHaHxN2fYS6Czo",
  authDomain: "moji-kala.firebaseapp.com",
  projectId: "moji-kala",
  storageBucket: "moji-kala.firebasestorage.app",
  messagingSenderId: "360981434010",
  appId: "1:360981434010:web:1f5ed62e1a8a8a5599d923",
  measurementId: "G-NQKP7N1LM9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
