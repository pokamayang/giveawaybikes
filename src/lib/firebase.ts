import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCHO2lQHKf2is_q8qN-1eYSssDzvlHGwSs",
  authDomain: "bikegiveaway.firebaseapp.com",
  projectId: "bikegiveaway",
  storageBucket: "bikegiveaway.firebasestorage.app",
  messagingSenderId: "345728167364",
  appId: "1:345728167364:web:6cc4f6d0477787620e0891",
  measurementId: "G-BET5LDVXLX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics only in browser
let analytics: ReturnType<typeof getAnalytics> | null = null;
isSupported().then((yes) => {
  if (yes) analytics = getAnalytics(app);
});

export { analytics };
export default app;
