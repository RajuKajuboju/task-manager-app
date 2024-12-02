
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCni6GeVLnat8xTjUBnj9uGx4Ae4mgozmA",
  authDomain: "task-manager-app-82ff3.firebaseapp.com",
  projectId: "task-manager-app-82ff3",
  storageBucket: "task-manager-app-82ff3.firebasestorage.app",
  messagingSenderId: "667866340250",
  appId: "1:667866340250:web:09c3c4bd582172d1423823",
  measurementId: "G-V8MME692ZX"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
