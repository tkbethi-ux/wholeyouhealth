// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpYMxc7aN2fwEkq_LXiiS54LbaAPuyEIo",
  authDomain: "wholeyouhealth-a3331.firebaseapp.com",
  projectId: "wholeyouhealth-a3331",
  storageBucket: "wholeyouhealth-a3331.firebasestorage.app",
  messagingSenderId: "932087516285",
  appId: "1:932087516285:web:115fbec41cf69c7c947514",
  measurementId: "G-LK1T1VWPRV"
};


// Initialize Firebase (avoid re-initializing in hot reload)
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
