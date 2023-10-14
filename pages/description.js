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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bookId = urlParams.get("id");

async function getData() {
  const docRef = doc(db, "books", bookId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log(docSnap.data());

    let image = document.getElementById("imageUrl");
    image.src = docSnap.data().imageUrl;

    document.getElementById("author").innerHTML = docSnap.data().author;
    document.getElementById("title").innerHTML = docSnap.data().title;
    document.getElementById("category").innerHTML = docSnap.data().category;
    document.getElementById("description").innerHTML =
      docSnap.data().description;
    document.getElementById("price").innerHTML = docSnap.data().price + " VNĐ";
  } else {
    // docSnap.data() will be undefined in this case
    window.location.href = "./index.html";
  }
}

getData();

const logOutBtn = document.getElementById("logout");
logOutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      alert(error.message);
    });
});

onAuthStateChanged(auth, (cUser) => {
  const spanContainer = document.getElementById("account");

  if (cUser) {
    console.log(cUser);
    user = cUser;
    spanContainer.innerHTML = `<a href="#" class="nav-bar-link">${cUser.email}</a>`;
    //getCart();
  } else {
    logOutBtn.classList.add("d-none");
    spanContainer.innerHTML = `<a href="./login.html" class="nav-bar-link">Tài khoản của tôi</a>`;
  }
});
