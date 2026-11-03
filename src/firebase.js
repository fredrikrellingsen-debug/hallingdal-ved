import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "pot-kunder-439a4.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "pot-kunder-439a4",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "pot-kunder-439a4.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "461155550472",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:461155550472:web:8dde620e98f61030e3d8bd"
};

const app = firebaseConfig.apiKey ? initializeApp(firebaseConfig) : null;

export { app, firebaseConfig };
export default app;
