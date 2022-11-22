// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"
// import "firebase/compat/storage";
// import "firebase/compat/firestore"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjx3dvWCgXsOpl2Pi9iP9b_9Kga7fGuEU",
  authDomain: "ecapp-29a69.firebaseapp.com",
  projectId: "ecapp-29a69",
  storageBucket: "ecapp-29a69.appspot.com",
  messagingSenderId: "861989562652",
  appId: "1:861989562652:web:b9da2da26f788553f932d9"};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

const projectAuth = firebase.auth();
const firestore = firebase.firestore();
// const projectStorage = firebase.storage();


export { firestore,projectAuth} ;
