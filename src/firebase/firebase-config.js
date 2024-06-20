// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getFirestore } = require("firebase/firestore");
const {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
    EmailAuthProvider,
} = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCGnKrFxyvi4jr5C24Shs2GKQSlwWijOH4",
    authDomain: "nitflex-cf3e6.firebaseapp.com",
    projectId: "nitflex-cf3e6",
    storageBucket: "nitflex-cf3e6.appspot.com",
    messagingSenderId: "1022847936651",
    appId: "1:1022847936651:web:4b0234acbc5c50aa768c8e",
    measurementId: "G-0G0KX9L716",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const emailProvider = new EmailAuthProvider();
const db = getFirestore(app);
const auth = getAuth(app);

module.exports = { googleProvider, facebookProvider, emailProvider, db, auth };
