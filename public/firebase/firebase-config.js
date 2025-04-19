// ================================================== \\

// ~~ Importa funções do Firebase.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

// ~~ Exporta recursos.
export { db, auth, collection, getDocs };

// ================================================== \\