import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJo9DyW8_xD-DjKzNqK-aBVl0BAj7Ht54",
    authDomain: "chatgpt-messenger-next.firebaseapp.com",
    projectId: "chatgpt-messenger-next",
    storageBucket: "chatgpt-messenger-next.appspot.com",
    messagingSenderId: "942461440858",
    appId: "1:942461440858:web:467768331a8eb4c27fd963"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };