import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdxgsawf35vF2oFUZullObzcMvRliM5bI",
  authDomain: "netflix-clone-223bc.firebaseapp.com",
  projectId: "netflix-clone-223bc",
  storageBucket: "netflix-clone-223bc.appspot.com",
  messagingSenderId: "512714893174",
  appId: "1:512714893174:web:e18c08bad76085c1a43c57",
  measurementId: "G-YW4D762SKD",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
