import { UI } from "/ui.js";

const previewObject = document.querySelector(".preview-object");
const previewLine = document.querySelector(".preview-line");

UI.seesawClickable.addEventListener("mousemove", (event) => {
  const rect = UI.seesawClickable.getBoundingClientRect();
  const x = event.clientX - rect.left;

  previewObject.style.display = "block";
  previewLine.style.display = "block";

  previewObject.style.left = `${x}px`;
  previewLine.style.left = `${x}px`;
});

UI.seesawClickable.addEventListener("mouseleave", () => {
  previewObject.style.display = "none";
  previewLine.style.display = "none";
});
