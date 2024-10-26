// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0gVboDhULczgayQnpcPeT_QDnWFkZ8wk",
    authDomain: "finals-b303b.firebaseapp.com",
    projectId: "finals-b303b",
    storageBucket: "finals-b303b.appspot.com",
    messagingSenderId: "207343577189",
    appId: "1:207343577189:web:1e54df89a69b48c252be8c",
    measurementId: "G-31QW57Z5Z1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
