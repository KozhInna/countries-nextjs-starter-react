import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  addDoc,
  getFirestore,
  collection,
  where,
  query,
  getDocs,
  getDoc,
} from "firebase/firestore";
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
export const app = initializeApp(firebaseConfig);

// here we get access to the project authentication
const auth = getAuth(app);

// here we get access to the project database
const db = getFirestore(app);

const registerWithEmailAndPassword = async (name, email, password) => {
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

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

export const logout = () => {
  //auth.signOut is version 8
  //signOut(auth) is version 9

  auth.signOut();
};

export const getUserData = async (uid) => {
  const colletionRef = collection(db, "users");
  const q = query(colletionRef, where("uid", "==", `${uid}`));

  const querySnapshot = await getDocs(q);
  let userName = null;
  querySnapshot.forEach((doc) => {
    //console.log("res", doc.id, " => ", doc.data().name);
    userName = doc.data().name;
  });
  return userName;
};

export { auth, db, registerWithEmailAndPassword };
