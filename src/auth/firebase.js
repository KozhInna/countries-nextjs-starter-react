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
  deleteDoc,
} from "firebase/firestore";

import { getFavorites } from "../store/favoritesSlice";
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
    console.log("here", error);
    alert(error.message);
  }
};

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log("here2", err);
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

export const addFavoriteToFirebase = async (uid, name) => {
  try {
    await addDoc(collection(db, `users/${uid}/favorites`), { name });
    console.log("Favorite added to Firebase database");
  } catch (err) {
    console.error("Error adding favorite to Firebase database: ", err);
  }
};

export const removeFavoriteFromFirebase = async (uid, name) => {
  console.log("Name: ", name);
  try {
    if (!name) {
      console.error(
        "Error removing favorite from Firebase database: name parameter is undefined"
      );
      return;
    }
    const q = query(
      collection(db, `users/${uid}/favorites`),
      where("name", "==", name)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
      console.log("Favorite removed from Firebase database");
    });
  } catch (err) {
    console.error("Error removing favorite from Firebase database: ", err);
  }
};

export const clearFavoritesFromFirebase = async (uid) => {
  try {
    const q = query(collection(db, `users/${uid}/favorites`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
      console.log("Favorites removed from Firebase database");
    });
  } catch (err) {
    console.error("Error removing favorites from Firebase database: ", err);
  }
};

export const getFavoritesFromSource = () => async (dispatch) => {
  const user = auth.currentUser;
  if (user) {
    const q = await getDocs(collection(db, `users/${user.uid}/favorites`));
    const favorites = q.docs.map((doc) => doc.data().name);
    dispatch(getFavorites(favorites));
  }
};

export { auth, db, registerWithEmailAndPassword };
