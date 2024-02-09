import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "countries-react-8114e.firebaseapp.com",
  projectId: "countries-react-8114e",
  storageBucket: "countries-react-8114e.appspot.com",
  messagingSenderId: "1076968463818",
  appId: "1:1076968463818:web:1d9703b424cf2bb5e0c333",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// here we get access to the project authentication
const auth = getAuth(app);

// here we get access to the project database
const db = getFirestore(app);

const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};
export { registerWithEmailAndPassword, auth, db };
