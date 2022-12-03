import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBs__W6wwPEGm7YAcjEpQxQSmIyNkdv0DE",
  authDomain: "tik-talk-app-18bd8.firebaseapp.com",
  projectId: "tik-talk-app-18bd8",
  storageBucket: "tik-talk-app-18bd8.appspot.com",
  messagingSenderId: "444960713218",
  appId: "1:444960713218:web:5cfd6f8839c8ffee57951b",
  measurementId: "G-9CZD0B2Q2K"
});

export const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, storage, provider };
