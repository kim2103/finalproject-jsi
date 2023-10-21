import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bookId = urlParams.get("id");

async function getData() {
  const docRef = doc(db, "books", bookId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    document.getElementById("title").value = docSnap.data().title;
    document.getElementById("author").value = docSnap.data().author;
    document.getElementById("category").value = docSnap.data().category;
    document.getElementById("description").value = docSnap.data().description;
    document.getElementById("imageUrl").value = docSnap.data().imageUrl;
    document.getElementById("price").value = docSnap.data().price;
  } else {
    // docSnap.data() will be undefined in this case
    window.location.href = "adminbooks.html";
  }
}

getData();

let form = document.getElementById("create-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  await updateDoc(doc(db, "books", bookId), {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    category: document.getElementById("category").value,
    description: document.getElementById("description").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: document.getElementById("price").value,
  });

  alert("Successfully!!!");
  window.location.href = "adminbooks.html";
});
