import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDS4UtLzEMaMZezI1rzYlgK1zXBPSgkXhk",
    authDomain: "teachoo.firebaseapp.com",
    projectId: "teachoo",
    storageBucket: "teachoo.firebasestorage.app",
    messagingSenderId: "680716096200",
    appId: "1:680716096200:web:07539307cf334977b98bfd",
    measurementId: "G-5DCH45KZEB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };