import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvOYWVGMmHAJcBtcDXQq8d2k6CWzahyYk",
    authDomain: "quiz-app-32dd8.firebaseapp.com",
    databaseURL: "https://quiz-app-32dd8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "quiz-app-32dd8",
    storageBucket: "quiz-app-32dd8.appspot.com",
    messagingSenderId: "1009227063659",
    appId: "1:1009227063659:web:5679a98c7373fd0165ec2e",
  };


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);