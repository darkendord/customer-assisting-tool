import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeTp1dw6KiPEE5VDr-9_1WGaUJ8a6n_yQ",
  authDomain: "cat-authentication. firebaseapp.com",
  projectId: "cat-authentication",
  storageBucket: "cat-authentication.appspot.com",
  messagingSenderId: "310912385046",
  appId: "1:310912385046: web: 0660fda270de249fcd3537"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
