// Firebase SDKs ko import karein
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// --- AAPKI FIREBASE CONFIGURATION ---
// Firebase Console -> Project Settings -> General -> Your Apps mein se niche wali details copy karein
const firebaseConfig = {
    apiKey: "AIzaSyBv0qnY-Nf0UalkRnJFVKEw4Jm4IzUVEp0",
  authDomain: "examedge-a9670.firebaseapp.com",
  projectId: "examedge-a9670",
  storageBucket: "examedge-a9670.firebasestorage.app",
  messagingSenderId: "178061039826",
  appId: "1:178061039826:web:28efb99ba810b703b4350b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);