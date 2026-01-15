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

  const element = createWeightElement(x);
  seasawPlank.appendChild(element);

  requestAnimationFrame(() => {
    element.style.top = "0px";
  });
  /** @type {Weight} */
  const weight = {
    id: crypto.randomUUID(),
    mass: getRandomMass(),
    position,
    element,
  };

  weights.push(weight);
});

function createWeightElement(x) {
  const el = document.createElement("div");
  // el.className = "weight";
  el.style.position = "absolute";
  el.style.top = `-200px`;

  el.style.left = `${x}px`;
  el.style.width = `${40}px`;
  el.style.height = `${40}px`;
  el.style.backgroundColor = `red`;
  el.style.transition = "top 0.6s ease-in";

  return el;
}

function getRandomMass() {
  return Math.floor(Math.random() * 10) + 1;
}
