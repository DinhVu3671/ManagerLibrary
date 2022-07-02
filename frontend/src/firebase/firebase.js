// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLWgWDgpjmlemvBedF8XhjLaFq53eG3kA",
  authDomain: "khdl-336708.firebaseapp.com",
  projectId: "khdl-336708",
  storageBucket: "khdl-336708.appspot.com",
  messagingSenderId: "852816847428",
  appId: "1:852816847428:web:138c3e814093de3c801211",
  measurementId: "G-EPQKNNWCWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };