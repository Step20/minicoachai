// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA99ZahI3aBfUHb7ILYIXqRlAjDg6Pd-U",
  authDomain: "mini-coach-ai.firebaseapp.com",
  projectId: "mini-coach-ai",
  storageBucket: "mini-coach-ai.firebasestorage.app",
  messagingSenderId: "823876525627",
  appId: "1:823876525627:web:53a2d42029c8c69b7d061e",
  measurementId: "G-VNYP4DS41V"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
export const storage = getStorage(app);

export { auth, db };