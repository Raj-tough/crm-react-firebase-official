import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database"
const firebaseConfig = {
    apiKey: "AIzaSyC-oP2_DijO7SQlVl3VPDJMPwgMZuuR4V8",
    authDomain: "srk-crm-backend.firebaseapp.com",
    databaseURL: "https://srk-crm-backend.firebaseio.com",
    projectId: "srk-crm-backend",
    storageBucket: "srk-crm-backend.appspot.com",
    messagingSenderId: "840582684836",
    appId: "1:840582684836:web:6e5c906160f2f946b10631",
    measurementId: "G-71NKSLSX75"
  };


  export const myFirebase = firebase.initializeApp(firebaseConfig)
  const baseDb = myFirebase.firestore()
  export const db = baseDb
  const firedatabase = firebase.database()
  export const fireDb = firedatabase
