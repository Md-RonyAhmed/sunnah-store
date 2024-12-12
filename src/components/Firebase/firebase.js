import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAigCotFj1olhbtC56irnX4n_SkrAHMzpE",
  authDomain: "sunnah-store-aba4c.firebaseapp.com",
  projectId: "sunnah-store-aba4c",
  storageBucket: "sunnah-store-aba4c.firebasestorage.app",
  messagingSenderId: "520788667003",
  appId: "1:520788667003:web:329c3fd48aa180c2bcd0de",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
