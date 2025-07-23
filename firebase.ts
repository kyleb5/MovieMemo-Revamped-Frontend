import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCR5InrjsUltmtqZTrS-E6K_xAO7GSKtsc",
  authDomain: "moviememo-revamped.firebaseapp.com",
  projectId: "moviememo-revamped",
  storageBucket: "moviememo-revamped.firebasestorage.app",
  messagingSenderId: "267919572843",
  appId: "1:267919572843:web:f16eead8d0d092c93cd62e",
  measurementId: "G-85E03VV785"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };