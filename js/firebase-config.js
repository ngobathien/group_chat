import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyAvRdp_6MpqunGg_m3cTY6IzTgfEd-NgNw",
//   authDomain: "cruduseres6-ce478.firebaseapp.com",
//   databaseURL:
//     "https://cruduseres6-ce478-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "cruduseres6-ce478",
//   storageBucket: "cruduseres6-ce478.firebasestorage.app",
//   messagingSenderId: "342838378302",
//   appId: "1:342838378302:web:a313a4f9865096a7f0366f",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDXoCbgrZsvLkmwG1ODrK5QCB2fdztPGPk",
  authDomain: "qlyktx.firebaseapp.com",
  databaseURL: "https://qlyktx-default-rtdb.firebaseio.com",
  projectId: "qlyktx",
  storageBucket: "qlyktx.firebasestorage.app",
  messagingSenderId: "477852817347",
  appId: "1:477852817347:web:f8f4cd29c995b300a5cf76",
  measurementId: "G-DP5Y2602CX",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { db, auth, ref, push, set, onChildAdded, serverTimestamp };
