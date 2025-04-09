// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

require('dotenv').config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "chatify-1-0-0.firebaseapp.com",
  projectId: "chatify-1-0-0",
  storageBucket: "chatify-1-0-0.appspot.com",
  messagingSenderId: "722351389860",
  appId: "1:722351389860:web:583ca8ca5d6972ab547a31"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);