import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  ref,
  child,
  get,
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

let card = document.createElement("div");
card.classList.add("card");

let imgContainer = document.createElement("div");
imgContainer.classList.add("image-container");

let image = document.createElement("img");
image.setAttribute("src", item.data().imageUrl);
imgContainer.appendChild(image);
card.appendChild(imgContainer);

let container = document.createElement("div");
container.classList.add("container");

let title = document.createElement("h5");
title.classList.add("product-name");
title.innerText = item.data().title.toUpperCase();
container.appendChild(title);

let price = document.createElement("h6");
price.innerHTML = "<b>Giá:</b> " + item.data().price;
container.appendChild(price);
