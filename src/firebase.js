import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCKg6Oh3qChkAFsU6uvz79Z0Nfh37QUnEI",
  authDomain: "slack-clone-app-17214.firebaseapp.com",
  projectId: "slack-clone-app-17214",
  storageBucket: "slack-clone-app-17214.appspot.com",
  messagingSenderId: "919596434489",
  appId: "1:919596434489:web:b074b5a959aae834c8f9e8",
  measurementId: "G-6T5134YR7R",
});

export const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, storage, provider };
