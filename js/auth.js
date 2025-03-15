import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// DOM Elements
const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");
const chatSection = document.getElementById("chatSection");

// Toggle giữa login và register
document.getElementById("showRegister").addEventListener("click", () => {
  loginSection.classList.add("hidden");
  registerSection.classList.remove("hidden");
});
document.getElementById("showLogin").addEventListener("click", () => {
  registerSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
});

// Đăng ký tài khoản mới
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      await set(ref(db, "users/" + userCredential.user.uid), {
        uid: userCredential.user.uid,
        displayName: name,
        email: userCredential.user.email,
      });
      alert("Đăng ký thành công!");
      loginSection.classList.remove("hidden");
      registerSection.classList.add("hidden");
    } catch (error) {
      alert("Lỗi đăng ký: " + error.message);
    }
  });

// Đăng nhập
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    chatSection.classList.remove("hidden");
    loginSection.classList.add("hidden");
  } catch (error) {
    alert("Lỗi đăng nhập: " + error.message);
  }
});

// Quan sát trạng thái người dùng
onAuthStateChanged(auth, (user) => {
  if (user) {
    chatSection.classList.remove("hidden");
    loginSection.classList.add("hidden");
  } else {
    loginSection.classList.remove("hidden");
    chatSection.classList.add("hidden");
  }
});

// Đăng xuất
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
});
