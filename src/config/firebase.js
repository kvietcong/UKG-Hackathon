import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzvJBe9GttQ2wLKV3zPCUoxZq3SByBTjQ",
  authDomain: "ukg-hackathon.firebaseapp.com",
  projectId: "ukg-hackathon",
  storageBucket: "ukg-hackathon.appspot.com",
  messagingSenderId: "684832845061",
  appId: "1:684832845061:web:727c3a18c83ef8abf39b6c",
  measurementId: "G-6BZCXJ9Z39"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
