// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9r-wON9aYvH6ZxTyAv97F8rYyv9tRfM8",
  authDomain: "inventory-tracking-c4ff0.firebaseapp.com",
  projectId: "inventory-tracking-c4ff0",
  storageBucket: "inventory-tracking-c4ff0.appspot.com",
  messagingSenderId: "788061478900",
  appId: "1:788061478900:web:15a9e93ac7d48e63c823a1",
  measurementId: "G-FNS37THC64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}