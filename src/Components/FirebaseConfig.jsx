import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";

// chat
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCpsr5_k3rsfdeYLgvQeV5qjN9_otO-PJs",
  authDomain: "react-login-b92f7.firebaseapp.com",
  projectId: "react-login-b92f7",
  storageBucket: "react-login-b92f7.appspot.com",
  messagingSenderId: "253151101414",
  appId: "1:253151101414:web:78305d60df0b15ef485627",
  measurementId: "G-36L1D9GY3R"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase();
export {getAuth,auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,database}
