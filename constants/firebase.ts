// Firebase for React Native + Expo
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBy2KsQy1_k8ReQs1nAQ6Mxc9lGZgLP2Qg",
    authDomain: "giggle-0.firebaseapp.com",
    projectId: "giggle-0",
    storageBucket: "giggle-0.firebasestorage.app",
    messagingSenderId: "292298098764",
    appId: "1:292298098764:web:b27d8c1137eda49e1ecce9",
    measurementId: "G-YVBH6HGVF7"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
