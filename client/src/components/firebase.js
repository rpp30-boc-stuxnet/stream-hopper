// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBa8Qq6QRdsUIdcCGbFGdCwjlMKHesWanI",
  authDomain: "stuxnet-boc-rpp30.firebaseapp.com",
  projectId: "stuxnet-boc-rpp30",
  storageBucket: "stuxnet-boc-rpp30.appspot.com",
  messagingSenderId: "916683907756",
  appId: "1:916683907756:web:64912631b6e6d77105f509",
  measurementId: "G-64RFV7ZW0E"
};

//CDN for auth from firebase:
// import { auth } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js'

//general CDN for general firebase (i think)
//import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
