import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCFU_qfCY4yPlzO-rR8gXJYpZiKOW-B9wg",
    authDomain: "shopping-list-c7ed9.firebaseapp.com",
    projectId: "shopping-list-c7ed9",
    storageBucket: "shopping-list-c7ed9.appspot.com",
    messagingSenderId: "889286377177",
    appId: "1:889286377177:web:bf7880f0db055aa24888c8",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
