const previewObject = document.querySelector(".preview-object");
const previewLine = document.querySelector(".preview-line");
const seesawClickable = document.getElementById("seesawClickable");

seesawClickable.addEventListener("mousemove", (event) => {
  const rect = seesawClickable.getBoundingClientRect();
  const x = event.clientX - rect.left;
  previewObject.style.left = `${x}px`;
  previewLine.style.left = `${x}px`;
});

seesawClickable.addEventListener("mouseleave", () => {
  previewObject.style.display = "none";
  previewLine.style.display = "none";
});

seesawClickable.addEventListener("mouseenter", () => {
  previewObject.style.display = "block";
  previewLine.style.display = "block";
});
