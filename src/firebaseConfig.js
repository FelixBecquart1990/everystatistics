import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import "firebase/analytics";

// firebase init
const config = {
  apiKey: "AIzaSyCYCuqPko_s-yhsewqbdcoDJuORtSItnXc",
  authDomain: "everystatistics.firebaseapp.com",
  databaseURL: "https://everystatistics.firebaseio.com",
  projectId: "everystatistics",
  storageBucket: "everystatistics.appspot.com",
  messagingSenderId: "734248653577",
  appId: "1:734248653577:web:796d282cec5e29608df9d8",
  measurementId: "G-FHGY9BYWWN"
};

firebase.initializeApp(config);
// firebase.performance();
// firebase.analytics();

export default firebase;
