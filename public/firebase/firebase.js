// ================================================== \\

// ~~ Importa funções do Firebase.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// ================================================== \\

// ~~ Firebase config.
const firebaseConfig = {
  apiKey: "AIzaSyAovVxCbxJHHpDz1vdKZewdbwClKuQNQy0",
  authDomain: "padre-natal-pigatto.firebaseapp.com",
  projectId: "padre-natal-pigatto",
  storageBucket: "padre-natal-pigatto.firebasestorage.app",
  messagingSenderId: "209413702443",
  appId: "1:209413702443:web:4d4189730cfd6344733b6e",
  measurementId: "G-B6F9JH42HE"
};

// ================================================== \\

// Inicializa funções.
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ================================================== \\