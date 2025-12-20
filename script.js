function updateClock() {
  const el = document.getElementById("taskbar-clock");
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  el.textContent = h + ":" + m;
}
setInterval(updateClock, 1000);
updateClock();

const logEl = document.getElementById("log");
const demoLines = [
  "[03:12] POLL: NTP-01 heartbeat OK",
  "[03:13] WX: Advisory issued for MEL sector",
  "[03:14] NTP-02: Route deviation &lt; 2 nm",
  "[03:15] NTP-04: Awaiting new position fix"
];

let index = 0;
setInterval(() => {
  if (!logEl) return;
  logEl.textContent += "\n" + demoLines[index % demoLines.length];
  logEl.scrollTop = logEl.scrollHeight;
  index++;
}, 5000);
