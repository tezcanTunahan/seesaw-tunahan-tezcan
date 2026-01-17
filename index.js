import "./preview.js";
import { UI } from "./ui.js";
import Seesaw from "./Seesaw.js";

const seesaw = new Seesaw(UI.seesawClickable, UI.seesawPlank);

updateStats();

UI.seesawClickable.addEventListener("mousedown", (event) => {
  if (event.target !== UI.seesawClickable) return;
  const { offsetFromCenter, mass, side } = seesaw.addWeight(event.clientX);
  addLogEntry(offsetFromCenter, mass, side);
  updateStats();
});

UI.resetBtn.addEventListener("click", (event) => {
  seesaw.reset();
  updateStats();
  UI.log.innerHTML = "";
});

function addLogEntry(offsetFromCenter, mass, side) {
  const el = document.createElement("div");
  el.className = "log-entry";
  el.textContent = `📦 ${mass.toFixed(1)}kg dropped on ${side} side at ${offsetFromCenter}px from center`;
  UI.log.prepend(el);
}

function updateStats() {
  UI.tiltAngle.textContent = `${seesaw.angle.toFixed(1)}°`;
  UI.leftWeight.textContent = `${seesaw.leftWeight.toFixed(1)} kg`;
  UI.rightWeight.textContent = `${seesaw.rightWeight.toFixed(1)} kg`;
  UI.nextWeight.textContent = `${seesaw.nextWeight.mass.toFixed(1)} kg`;
}
