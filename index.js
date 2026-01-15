import "/preview.js";
const seesawClickable = document.getElementById("seesawClickable");
const seasawPlank = document.getElementById("seasaw-plank");
/**
 * @typedef {Object} Weight
 * @property {string} id
 * @property {number} mass
 * @property {number} position
 * @property {HTMLElement} element
 */

/** @type {Weight[]} */
const weights = [];

seesawClickable.addEventListener("click", (event) => {
  const rect = seesawClickable.getBoundingClientRect();
  const middle = rect.width / 2;
  const x = event.clientX - rect.left;
  let position = 0;

  if (x > middle) {
    position = x - middle;
  } else if (x < middle) {
    position = x - middle;
  }
  const mass = getRandomMass();
  const element = createWeightElement(x, mass);
  seasawPlank.appendChild(element);

  requestAnimationFrame(() => {
    element.style.top = "0px";
  });
  /** @type {Weight} */
  const weight = {
    id: crypto.randomUUID(),
    mass,
    position,
    element,
  };

  weights.push(weight);
});

function createWeightElement(x, mass) {
  const el = document.createElement("div");
  const size = 30 + mass * 5;
  el.className = "weight";
  el.style.left = `${x}px`;
  el.textContent = `${mass}kg`;
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.backgroundColor = getRandomColor();
  return el;
}

function getRandomMass() {
  return Math.floor(Math.random() * 10) + 1;
}

function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70;
  const lightness = 60;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
