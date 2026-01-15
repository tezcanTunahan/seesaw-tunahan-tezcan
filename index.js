const seesawClickable = document.getElementById("seesawClickable");
const previewObject = document.querySelector(".preview-object");
const previewLine = document.querySelector(".preview-line");

/**
 * @typedef {Object} Weight
 * @property {string} id
 * @property {number} mass
 * @property {number} position
 * @property {HTMLElement} element
 */

/** @type {Weight[]} */
const weights = [];

seesawClickable.addEventListener("mousemove", (event) => {
  const rect = seesawClickable.getBoundingClientRect();
  const width = rect.width;
  const middle = width / 2;

  const x = event.clientX - rect.left;
  previewObject.style.left = `${x}px`;
  previewLine.style.left = `${x}px`;
  if (x > middle) {
    // right
    const distance = x - middle;
  } else if (x < middle) {
    // left
    const distance = middle - x;
  } else {
    console.log(middle - x, "mid");
  }
});

seesawClickable.addEventListener("click", (event) => {
  const rect = seesawClickable.getBoundingClientRect();
  const x = event.clientX - rect.left;

  console.log(x, "x-mouseclick:");
});

seesawClickable.addEventListener("mouseleave", () => {
  previewObject.style.display = "none";
  previewLine.style.display = "none";
});

seesawClickable.addEventListener("mouseenter", () => {
  previewObject.style.display = "block";
  previewLine.style.display = "block";
});
