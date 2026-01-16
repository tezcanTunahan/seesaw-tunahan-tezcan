import "/preview.js";
import { UI } from "./ui.js";
import Seesaw from "/Seesaw.js";

const seesaw = new Seesaw();

UI.seesawClickable.addEventListener("mousedown", (event) => {
  if (event.target !== UI.seesawClickable) return;
  const rect = UI.seesawClickable.getBoundingClientRect();
  const relativeX = event.clientX - rect.left;

  const position = relativeX - rect.width / 2;

  seesaw.addWeight(position, relativeX);
  const torque = seesaw.calculateTotalTorque();
  seesaw.applyRotation(torque);
});
