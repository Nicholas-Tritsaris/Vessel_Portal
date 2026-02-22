import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-analytics.js";
import { getFirestore, collection, onSnapshot, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDi21XaltvjBrOiYp5Vs9JpbRhHliZluS0",
  authDomain: "my-webpages-200a1.firebaseapp.com",
  projectId: "my-webpages-200a1",
  storageBucket: "my-webpages-200a1.firebasestorage.app",
  messagingSenderId: "458562818634",
  appId: "1:458562818634:web:7c7f201949d3c750b54cb3",
  measurementId: "G-T9960R217F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Clock Functionality
function updateClock() {
  const el = document.getElementById("taskbar-clock");
  if (!el) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  el.textContent = h + ":" + m;
}
setInterval(updateClock, 1000);
updateClock();

// Vessel Sync
const vesselTbody = document.getElementById("vessel-tbody");
const vesselQuery = query(collection(db, "vessels"), orderBy("order", "asc"));
onSnapshot(vesselQuery, (snapshot) => {
  if (snapshot.empty) {
    console.warn("No vessels found in Firestore. Check 'vessels' collection.");
    return;
  }
  vesselTbody.innerHTML = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${data.name || ""}</td>
      <td>${data.route || ""}</td>
      <td>${data.eta || ""}</td>
      <td class="${data.statusClass || ""}">${data.status || ""}</td>
      <td>${data.lastUpdate || ""}</td>
    `;
    vesselTbody.appendChild(tr);
  });
});

// Log Sync
const logEl = document.getElementById("log");
const q = query(collection(db, "logs"), orderBy("timestamp", "asc"), limit(50));
onSnapshot(q, (snapshot) => {
  if (snapshot.empty) {
    console.warn("No logs found in Firestore. Check 'logs' collection.");
    return;
  }
  let logText = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    logText += (logText ? "\n" : "") + (data.text || "");
  });
  if (logEl) {
    logEl.textContent = logText;
    logEl.scrollTop = logEl.scrollHeight;
  }
});
