
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7TtxiEUOeW0XcdJUN4zK7OzcKOLQkzMk",
  authDomain: "sabrioglu-d933a.firebaseapp.com",
  projectId: "sabrioglu-d933a",
  storageBucket: "sabrioglu-d933a.firebasestorage.app",
  messagingSenderId: "111037795056",
  appId: "1:111037795056:web:270483ee943d8eedb7d035"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
const auth = getAuth(app);
export const storage = getStorage(app);
export {auth};
