import "/preview.js";
import { UI } from "/ui.js";
import Seesaw from "/Seesaw.js";

const seesaw = new Seesaw(UI.seesawClickable, UI.seesawPlank);

UI.seesawClickable.addEventListener("mousedown", (event) => {
  if (event.target !== UI.seesawClickable) return;
  const rect = UI.seesawClickable.getBoundingClientRect();
  const relativeX = event.clientX - rect.left;
  const offsetFromCenter = relativeX - rect.width / 2;
  seesaw.addWeightOnClick(offsetFromCenter, relativeX);
});

UI.resetBtn.addEventListener("click", (event) => {
  seesaw.reset();
});
