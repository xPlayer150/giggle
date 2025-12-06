// First, import initializeApp from the core Firebase app package
import { initializeApp } from "firebase/app";

// Next, import getAuth from the Firebase Authentication package
import { getAuth } from "firebase/auth"; // <-- This is where you import getAuth

// Your Firebase project configuration
const firebaseConfig = {
    // ... your project's configuration object
};

// 1. Initialize Firebase app
const app = initializeApp(firebaseConfig);

// 2. Get the Auth service instance by calling getAuth with your app
export const auth = getAuth(app); // <-- This 'auth' constant is what you use for sign-in, sign-up, etc.
