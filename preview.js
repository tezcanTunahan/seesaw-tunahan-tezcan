const previewObject = document.querySelector(".preview-object");
const previewLine = document.querySelector(".preview-line");

seesawClickable.addEventListener("mousemove", (event) => {
  const rect = seesawClickable.getBoundingClientRect();
  const x = event.clientX - rect.left;

  previewObject.style.display = "block";
  previewLine.style.display = "block";

  previewObject.style.left = `${x}px`;
  previewLine.style.left = `${x}px`;
});

seesawClickable.addEventListener("mouseleave", () => {
  previewObject.style.display = "none";
  previewLine.style.display = "none";
});
