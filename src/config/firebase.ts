/*eslint-disable */
import { initializeApp } from "firebase/app";

//Auth Service
import { getAuth } from "firebase/auth";

//firestore database
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmLTxSbkSsJnNaao7HETQwlN4BMWD9fTk",
  authDomain: "fir-applications-e96c5.firebaseapp.com",
  projectId: "fir-applications-e96c5",
  storageBucket: "fir-applications-e96c5.appspot.com",
  messagingSenderId: "192939796968",
  appId: "1:192939796968:web:8f8514c9392920fdc49c5d",
  measurementId: "G-M1L8L34L6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
