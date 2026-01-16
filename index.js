import "/preview.js";
import { UI } from "./ui.js";
import Seesaw from "./Seesaw.js";

const seesaw = new Seesaw(UI.seesawClickable, UI.seesawPlank);
updateStats();

UI.seesawClickable.addEventListener("mousedown", (event) => {
  if (event.target !== UI.seesawClickable) return;
  const rect = UI.seesawClickable.getBoundingClientRect();
  const relativeX = event.clientX - rect.left;
  const offsetFromCenter = relativeX - rect.width / 2;
  seesaw.addWeightOnClick(offsetFromCenter, relativeX);
  updateStats();
  createLogElement(
    seesaw.nextWeight.bgColor,
    offsetFromCenter,
    seesaw.nextWeight.mass
  );
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

function createLogElement(bgColor, offsetFromCenter, mass) {
  const el = document.createElement("div");
  el.style.display = "flex";
  el.style.alignItems = "center";
  el.style.gap = "10px";
  el.style.marginBottom = "5px";
  el.style.padding = "5px";
  el.style.borderBottom = "1px solid #eee";
  const colorBox = document.createElement("span");
  colorBox.style.width = "12px";
  colorBox.style.height = "12px";
  colorBox.style.borderRadius = "50%";
  colorBox.style.display = "inline-block";
  colorBox.style.backgroundColor = bgColor;
  const side = offsetFromCenter < 0 ? "Sol" : "Sağ";
  const text = document.createElement("span");
  text.textContent = `${side}: ${mass.toFixed(1)} kg, ${offsetFromCenter}`;

  el.appendChild(colorBox);
  el.appendChild(text);
  UI.log.prepend(el);
}
