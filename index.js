import "./preview.js";
import { UI } from "./ui.js";
import Seesaw from "./Seesaw.js";

const seesaw = new Seesaw(UI.seesawClickable, UI.seesawPlank);
updateStats();

UI.seesawClickable.addEventListener("mousedown", (event) => {
  if (event.target !== UI.seesawClickable) return;
  const { offsetFromCenter, mass } = seesaw.addWeightOnClick(event.clientX);
  createLogElement(offsetFromCenter, mass);
  updateStats();
});

UI.resetBtn.addEventListener("click", (event) => {
  seesaw.reset();
  updateStats();
  UI.log.innerHTML = "";
});

function updateStats() {
  UI.tiltAngle.textContent = `${seesaw.angle.toFixed(1)}°`;
  UI.leftWeight.textContent = `${seesaw.leftWeight.toFixed(1)} kg`;
  UI.rightWeight.textContent = `${seesaw.rightWeight.toFixed(1)} kg`;
  UI.nextWeight.textContent = `${seesaw.nextWeight.mass.toFixed(1)} kg`;
}

function createLogElement(offsetFromCenter, mass) {
  const el = document.createElement("div");
  el.className = "log-entry";
  const side = offsetFromCenter < 0 ? "Left" : "Right";
  el.textContent = `📦 ${mass.toFixed(1)}kg dropped on ${side} side at ${offsetFromCenter}px from center`;
  UI.log.prepend(el);
}
