import {
  db,
  auth,
  ref,
  push,
  set,
  onChildAdded,
  serverTimestamp,
} from "./firebase-config.js";

// DOM elements
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messagesContainer = document.getElementById("messagesContainer");

// Handle sending messages
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const messageText = messageInput.value.trim();
  if (!messageText || !auth.currentUser) return;

  const messageRef = push(ref(db, "messages"));
  set(messageRef, {
    uid: auth.currentUser.uid,
    displayName: auth.currentUser.displayName,
    text: messageText,
    createdAt: serverTimestamp(),
  });

  messageInput.value = "";
});

// Load and display messages
const messagesRef = ref(db, "messages");
onChildAdded(messagesRef, (snapshot) => {
  const message = snapshot.val();
  if (message) {
    displayMessage(message);
  }
});

function displayMessage(message) {
  const div = document.createElement("div");
  const isCurrentUser = message.uid === auth.currentUser?.uid;

  div.className = `flex items-start ${isCurrentUser ? "justify-end" : ""} mb-4`;
  div.innerHTML = `
    <div class="p-3 rounded-lg ${
      isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-300"
    }">
      <p class="text-sm font-semibold">${message.displayName}</p>
      <p>${message.text}</p>
      <p class="text-xs opacity-70">${formatTimestamp(message.createdAt)}</p>
    </div>
  `;

  messagesContainer.appendChild(div);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function formatTimestamp(timestamp) {
  if (!timestamp || !timestamp.seconds) return "Chưa xác định";
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
