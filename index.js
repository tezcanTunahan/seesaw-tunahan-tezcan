import "./preview.js";
import { UI } from "./ui.js";
import Seesaw from "./Seesaw.js";

const seesaw = new Seesaw(UI.seesawClickable, UI.seesawPlank);
updateStats();
updateLogEntry();

UI.seesawClickable.addEventListener("mousedown", (event) => {
  if (event.target !== UI.seesawClickable) return;
  seesaw.addWeight(event.clientX);
  updateStats();
  updateLogEntry();
});

UI.resetBtn.addEventListener("click", (event) => {
  seesaw.reset();
  updateStats();
  UI.log.innerHTML = "";
});

function updateLogEntry() {
  UI.log.innerHTML = null;
  seesaw.weights.map((w) => {
    const el = document.createElement("div");
    el.className = "log-entry";
    const side = w.offsetFromCenter < 0 ? "left" : "right";
    el.textContent = `📦 ${w.mass.toFixed(1)}kg dropped on ${side} side at ${w.offsetFromCenter}px from center`;
    UI.log.prepend(el);
  });
}

function updateStats() {
  UI.tiltAngle.textContent = `${seesaw.angle.toFixed(1)}°`;
  UI.leftWeight.textContent = `${seesaw.leftWeight.toFixed(1)} kg`;
  UI.rightWeight.textContent = `${seesaw.rightWeight.toFixed(1)} kg`;
  UI.nextWeight.textContent = `${seesaw.nextWeight.mass.toFixed(1)} kg`;
}
