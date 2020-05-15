import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBB_vx4K3EWmqCbDJFbcE3PWfzvfQSVeVM",
  authDomain: "wemo-12535.firebaseapp.com",
  databaseURL: "https://wemo-12535.firebaseio.com",
  projectId: "wemo-12535",
  storageBucket: "wemo-12535.appspot.com",
  messagingSenderId: "411099607692",
  appId: "1:411099607692:web:08468dd94a62958ef801a9",
  measurementId: "G-0LVJZBRQDV",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseDb = firebaseApp.database();

export { firebaseDb };
