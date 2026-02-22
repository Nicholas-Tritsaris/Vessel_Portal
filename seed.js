import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDi21XaltvjBrOiYp5Vs9JpbRhHliZluS0",
  authDomain: "my-webpages-200a1.firebaseapp.com",
  projectId: "my-webpages-200a1",
  storageBucket: "my-webpages-200a1.firebasestorage.app",
  messagingSenderId: "458562818634",
  appId: "1:458562818634:web:7c7f201949d3c750b54cb3",
  measurementId: "G-T9960R217F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vessels = [
  { name: "NTP-01", route: "SYD → MEL", eta: "03:14", status: "On schedule", statusClass: "status-ok", lastUpdate: "00:02 ago", order: 1 },
  { name: "NTP-02", route: "MEL → ADL", eta: "05:42", status: "Weather delay", statusClass: "status-warn", lastUpdate: "00:07 ago", order: 2 },
  { name: "NTP-03", route: "SYD → BNE", eta: "01:09", status: "Cruising", statusClass: "status-ok", lastUpdate: "Live", order: 3 },
  { name: "NTP-04", route: "BNE → PER", eta: "09:31", status: "Signal lost", statusClass: "status-alert", lastUpdate: "00:21 ago", order: 4 }
];

const logs = [
  { text: "[03:02] SYD-OPS: Handshake OK" },
  { text: "[03:05] MEL-OPS: Timeout (retrying)" },
  { text: "[03:07] NTP-02: Speed reduced due to swell" },
  { text: "[03:10] NTP-03: Position update received" }
];

async function seed() {
  console.log("Seeding vessels...");
  for (const vessel of vessels) {
    // Use setDoc with vessel name as ID to avoid duplicates
    await setDoc(doc(db, "vessels", vessel.name), vessel);
    console.log(`Added/Updated vessel: ${vessel.name}`);
  }

  console.log("Seeding logs...");
  for (const log of logs) {
    await addDoc(collection(db, "logs"), {
      ...log,
      timestamp: serverTimestamp()
    });
    console.log(`Added log: ${log.text}`);
  }
  console.log("Seeding complete!");
}

// To run this, you can temporarily add <script type="module" src="seed.js"></script> to index.html
// or run it in a environment that supports fetch and modules.
seed().catch(console.error);
