import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  limit,
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

let user = null;

async function getData() {
  const querySnapshot = await getDocs(collection(db, "books"));
  console.log(querySnapshot);
  querySnapshot.forEach((item) => {
    // Tạo div card
    let card = document.createElement("div");
    card.classList.add("card");

    // Tạo div chứa img: img container
    let imgContainer = document.createElement("a");
    imgContainer.href = `description.html?id=` + item.id;
    imgContainer.classList.add("image-container");

    let image = document.createElement("img");
    image.setAttribute("src", item.data().imageUrl);
    imgContainer.appendChild(image);
    card.appendChild(imgContainer);

    let container = document.createElement("div");
    container.classList.add("container");

    // Tên sản phẩm
    let title = document.createElement("h5");
    title.classList.add("product-name");
    title.innerText = item.data().title.toUpperCase();
    container.appendChild(title);

    // Giá tiền
    let price = document.createElement("h6");
    price.innerHTML = "<b>Giá:</b> " + item.data().price;
    container.appendChild(price);

    // thêm nút vào card

    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.classList.add("btn-primary");
    btn.innerHTML = `<i class="fa-solid fa-plus"></i> Thêm vào giỏ hàng`;

    container.appendChild(btn);

    // Thêm card sản phẩm vào danh sách products
    card.appendChild(container);
    document.getElementById("products").appendChild(card);
  });
}

getData();

//nav
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
