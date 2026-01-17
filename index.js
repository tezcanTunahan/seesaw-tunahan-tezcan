import { UI } from "./ui.js";
import Seesaw from "./Seesaw.js";
import { CONSTANTS } from "./constants.js";

const seesaw = new Seesaw(UI.seesawClickable, UI.seesawPlank);
updateStats();
updateLogEntry();

UI.seesawClickable.addEventListener("mousemove", (event) => {
  const rect = UI.seesawClickable.getBoundingClientRect();
  const x = event.clientX - rect.left;

  const size =
    CONSTANTS.WEIGHT_SIZE_BASE +
    seesaw.nextWeight.mass * CONSTANTS.WEIGHT_SIZE_MULTIPLIER;

  UI.previewObject.textContent = `${seesaw.nextWeight.mass.toFixed(1)} kg`;
  UI.previewObject.style.display = "flex";
  UI.previewObject.style.left = `${x}px`;
  UI.previewObject.style.width = `${size}px`;
  UI.previewObject.style.height = `${size}px`;

  UI.previewLine.style.display = "flex";
  UI.previewLine.style.left = `${x}px`;
});

UI.seesawClickable.addEventListener("mouseleave", () => {
  UI.previewObject.style.display = "none";
  UI.previewLine.style.display = "none";
});

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
    el.textContent = `📦 ${w.mass.toFixed(1)}kg dropped on ${side} side at ${Math.ceil(Math.abs(w.offsetFromCenter))}px from center`;
    UI.log.prepend(el);
  });
}

function updateStats() {
  UI.tiltAngle.textContent = `${seesaw.angle.toFixed(1)}°`;
  UI.leftWeight.textContent = `${seesaw.leftWeight.toFixed(1)} kg`;
  UI.rightWeight.textContent = `${seesaw.rightWeight.toFixed(1)} kg`;
  UI.nextWeight.textContent = `${seesaw.nextWeight.mass.toFixed(1)} kg`;
}
