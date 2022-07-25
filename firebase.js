import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
 
const firebaseConfig = {
    apiKey: "AIzaSyB1pW_nom4GIXqWN4Vsf4qpW0RM2R1ieIY",
    authDomain: "signal-clone-db3c0.firebaseapp.com",
    databaseURL: "https://signal-clone-db3c0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "signal-clone-db3c0",
    storageBucket: "signal-clone-db3c0.appspot.com",
    messagingSenderId: "490683204940",
    appId: "1:490683204940:web:b9b9a521a75e85945afbe9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

