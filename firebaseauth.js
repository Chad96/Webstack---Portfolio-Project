// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWie6OXZ5rcWN3hncqE3XFqCccTvI9pQU",
  authDomain: "alx-recipe-master.firebaseapp.com",
  projectId: "alx-recipe-master",
  storageBucket: "alx-recipe-master.appspot.com",
  messagingSenderId: "83978831331",
  appId: "1:83978831331:web:be365a3aba90e01492ccd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export the auth instance
export const auth = getAuth(app);
