import { UI } from "./ui.js";

UI.seesawClickable.addEventListener("mousemove", (event) => {
  const rect = UI.seesawClickable.getBoundingClientRect();
  const x = event.clientX - rect.left;

  UI.previewObject.style.display = "block";
  UI.previewLine.style.display = "block";
  UI.previewObject.style.left = `${x}px`;
  UI.previewLine.style.left = `${x}px`;
});

UI.seesawClickable.addEventListener("mouseleave", () => {
  UI.previewObject.style.display = "none";
  UI.previewLine.style.display = "none";
});
