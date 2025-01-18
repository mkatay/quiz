// Import the functions you need from the SDKs you need
import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//referenciák:
export const db = getFirestore(app);//referencia az adatbázishoz



  
  