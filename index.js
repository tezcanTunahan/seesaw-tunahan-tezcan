/**
 * @typedef {Object} Weight
 * @property {string} id
 * @property {number} mass
 * @property {number} position
 * @property {HTMLElement} element
 */

import "/preview.js";
import { getRandomColor, getRandomMass } from "/utils.js";

const seesawClickable = document.getElementById("seesawClickable");
const seesawPlank = document.getElementById("seesaw-plank");

/** @type {Weight[]} */
const weights = [];

seesawClickable.addEventListener("click", (event) => {
  const rect = seesawClickable.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const position = x - rect.width / 2;

  const mass = getRandomMass();
  const element = createWeightElement(x, mass);
  const id = crypto.randomUUID();
  weights.push({ id, mass, position, element });
  const torque = calculateTotalTorque();
  applyRotation(torque);
});

function calculateTotalTorque() {
  return weights.reduce((acc, w) => {
    return acc + w.mass * w.position;
  }, 0);
}

function applyRotation(torque) {
  const sensitivity = 0.05;
  let angle = torque * sensitivity;
  const maxAngle = 30;
  if (angle > maxAngle) angle = maxAngle;
  if (angle < -maxAngle) angle = -maxAngle;
  seesawPlank.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
}

function createWeightElement(x, mass) {
  const size = 30 + mass * 5;
  const el = document.createElement("div");

  el.className = "weight";
  el.style.left = `${x}px`;
  el.textContent = `${mass}kg`;
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;

  el.style.backgroundColor = getRandomColor();

  seesawPlank.appendChild(el);
  requestAnimationFrame(() => {
    el.style.top = "0px";
  });

  return el;
}
