
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDKKPKtZy_gShGKt14Vy0fF7xx8pEYZ1zY",
  authDomain: "react-myfirstapp-54d54.firebaseapp.com",
  projectId: "react-myfirstapp-54d54",
  storageBucket: "react-myfirstapp-54d54.appspot.com",
  messagingSenderId: "1007679815237",
  appId: "1:1007679815237:web:23056c671f7fe53c496d2c",
  measurementId: "G-23P9P12T45"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);