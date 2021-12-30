import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBa8Qq6QRdsUIdcCGbFGdCwjlMKHesWanI",
  authDomain: "stuxnet-boc-rpp30.firebaseapp.com",
  projectId: "stuxnet-boc-rpp30",
  storageBucket: "stuxnet-boc-rpp30.appspot.com",
  messagingSenderId: "916683907756",
  appId: "1:916683907756:web:64912631b6e6d77105f509",
  measurementId: "G-64RFV7ZW0E"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);