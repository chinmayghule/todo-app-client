import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCcMFxqA33XXeJJ3rPw-WbBLiCLX84xJe4",
  authDomain: "todo-app-b1f9b.firebaseapp.com",
  projectId: "todo-app-b1f9b",
  storageBucket: "todo-app-b1f9b.appspot.com",
  messagingSenderId: "601726536670",
  appId: "1:601726536670:web:57ac3c9d9b076b3b372b4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export { auth, provider };