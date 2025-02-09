// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "laborsloom.firebaseapp.com",
  projectId: "laborsloom",
  storageBucket: "laborsloom.firebasestorage.app",
  messagingSenderId: "286094018664",
  appId: "1:286094018664:web:0c174ea02f5b246d1ed3dd",
  measurementId: "G-5HGEWRLKFQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();
export default app;
export const db=getFirestore(app);
