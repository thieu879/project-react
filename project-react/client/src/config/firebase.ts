// firebase.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY_FIREBASE,
  authDomain: "project-3695d.firebaseapp.com",
  projectId: "project-3695d",
  storageBucket: "project-3695d.appspot.com",
  messagingSenderId: "316619107683",
  appId: "1:316619107683:web:e491e40e4f9bbb067fb756",
  measurementId: "G-RPL33G7CXP"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
