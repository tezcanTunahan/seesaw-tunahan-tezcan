import "/preview.js";
import { getRandomColor, getRandomMass } from "/utils.js";

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
  const id = crypto.randomUUID();
  weights.push({ id, mass, position, element });
});

function createWeightElement(x, mass) {
  const size = 30 + mass * 5;
  const el = document.createElement("div");

  el.className = "weight";
  el.style.left = `${x}px`;
  el.textContent = `${mass}kg`;
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.backgroundColor = getRandomColor();

  seasawPlank.appendChild(el);
  requestAnimationFrame(() => {
    el.style.top = "0px";
  });
  return el;
}
