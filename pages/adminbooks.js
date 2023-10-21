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

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

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
const auth = getAuth(app);

let container = document.getElementById("table-container");

async function getData() {
  const querySnapshot = await getDocs(collection(db, "books"));
  container.innerHTML = "";
  querySnapshot.forEach((item) => {
    let row = document.createElement("tr");

    let tdId = document.createElement("td");
    tdId.innerText = item.id;
    row.appendChild(tdId);

    let tdTitle = document.createElement("td");
    tdTitle.innerText = item.data().title;
    row.appendChild(tdTitle);

    let tdCategory = document.createElement("td");
    tdCategory.innerText = item.data().category;
    row.appendChild(tdCategory);

    let tdAuthor = document.createElement("td");
    tdAuthor.innerText = item.data().author;
    row.appendChild(tdAuthor);

    let tdDescription = document.createElement("td");
    tdDescription.innerText = item.data().description;
    row.appendChild(tdDescription);

    let tdPrice = document.createElement("td");
    tdPrice.innerText = item.data().price;
    row.appendChild(tdPrice);

    let tdEdit = document.createElement("td");
    let tdEditbtn = document.createElement("a");
    tdEditbtn.classList.add("btn");
    tdEditbtn.classList.add("btn-secondary");
    tdEditbtn.href = "updatebook.html?id=" + item.id;
    tdEditbtn.innerText = "Update";
    tdEdit.appendChild(tdEditbtn);
    row.appendChild(tdEdit);

    let tdDelete = document.createElement("td");
    let tdDeletebtn = document.createElement("button");
    tdDeletebtn.classList.add("btn");
    tdDeletebtn.classList.add("btn-danger");
    tdDeletebtn.innerText = "Delete";
    tdDeletebtn.addEventListener("click", async () => {
      await deleteDoc(doc(db, "books", item.id));
      getData();
    });
    tdDelete.appendChild(tdDeletebtn);
    row.appendChild(tdDelete);

    container.appendChild(row);
  });
}

onAuthStateChanged(auth, (user) => {
  if (user && user.email == "kim@gmail.com") {
    getData();
  } else {
    window.location.href = "./index.html";
  }
});
