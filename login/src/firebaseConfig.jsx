import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBROdYwqgcG7tW-xHRc7SfaGAJAvDDcVIQ",
  authDomain: "lab09-6315d.firebaseapp.com",
  projectId: "lab09-6315d",
  storageBucket: "lab09-6315d.firebasestorage.app",
  messagingSenderId: "947071814690",
  appId: "1:947071814690:web:81f11886b172f43f01ce7b",
  measurementId: "G-NEZ6XWCLCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
