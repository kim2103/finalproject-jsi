import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJaRXL9RQemgo38Bt1NqBfNYwBK4M-K4w",
  authDomain: "finalproject-aff27.firebaseapp.com",
  projectId: "finalproject-aff27",
  storageBucket: "finalproject-aff27.appspot.com",
  messagingSenderId: "681802981997",
  appId: "1:681802981997:web:196b141bcfcb1925e15564",
};

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cfpassword = document.getElementById("cfpassword");

document.getElementById("signUpBtn").addEventListener("click", (e) => {
  e.preventDefault();
  if (!name.value || !email.value || !password.value || !cfpassword.value) {
    alert("Please enter in full");
  }
  if (password.value != cfpassword.value) {
    alert("Password is not synchronized. Please retype");
  }

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("user", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error", errorMessage);
      alert(errorMessage);
      // ..
    });
});

document.getElementById("signInBtn").addEventListener("click", (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(
    auth,
    document.getElementById("email-login").value,
    document.getElementById("password-login").value
  )
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.href = "./index.html";

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     window.location.href = "./index.html";
//   }
// });
