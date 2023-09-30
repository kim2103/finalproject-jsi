import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let form = document.getElementById("create-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const docRef = await addDoc(collection(db, "books"), {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    category: document.getElementById("category").value,
    description: document.getElementById("description").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: document.getElementById("price").value,
  });

  alert("Successfully!!!");
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("category").value = "";
  document.getElementById("description").value = "";
  document.getElementById("imageUrl").value = "";
  document.getElementById("price").value = "";
});
