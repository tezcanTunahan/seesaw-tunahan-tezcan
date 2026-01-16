/**
 * @typedef {Object} Weight
 * @property {string} id
 * @property {number} mass
 * @property {number} position
 * @property {HTMLElement} element
 */
import { getRandomColor, getRandomInt } from "/utils.js";
import { CONSTANTS } from "./constants.js";
import { UI } from "./ui.js";

export default class Seesaw {
  /** @type {Weight[]} */
  #weights = [];
  #angle = 0;
  constructor() {}

  addWeight(position, relativeX) {
    const id = crypto.randomUUID();
    const mass = getRandomInt();
    const element = this.createWeightElement(relativeX, mass);
    this.#weights.push({ id, mass, position, element });
  }

  createWeightElement(position, mass) {
    const size =
      CONSTANTS.WEIGHT_SIZE_BASE + mass * CONSTANTS.WEIGHT_SIZE_MULTIPLIER;
    const el = document.createElement("div");

    el.className = "weight";
    el.style.left = `${position}px`;
    el.textContent = `${mass}kg`;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.backgroundColor = getRandomColor();

    UI.seesawClickable.appendChild(el);
    return el;
  }

  calculateTotalTorque() {
    return this.#weights.reduce((acc, w) => {
      return acc + w.mass * w.position;
    }, 0);
  }

  applyRotation(torque) {
    const sensitivity = CONSTANTS.SENSITIVITY;
    let angle = torque * sensitivity;

    if (angle > CONSTANTS.MAX_ANGLE) angle = CONSTANTS.MAX_ANGLE;
    if (angle < -CONSTANTS.MAX_ANGLE) angle = -CONSTANTS.MAX_ANGLE;

    UI.seesawPlank.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

    const angleRad = (angle * Math.PI) / 180;
    requestAnimationFrame(() => {
      this.#weights.map((weight) => {
        const distance = weight.position;
        const offsetX = distance * Math.cos(angleRad);
        const offsetY = distance * Math.sin(angleRad);
        weight.element.style.top = `calc(50% + ${offsetY}px)`;
        weight.element.style.left = `calc(50% + ${offsetX}px)`;
      });
    });
  }
}
