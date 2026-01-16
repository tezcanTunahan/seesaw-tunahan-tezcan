/**
 * @typedef {Object} Weight
 * @property {string} id
 * @property {number} mass
 * @property {number} position
 * @property {HTMLElement} element
 */
import { getRandomColor, getRandomInt } from "/utils.js";
import { CONSTANTS } from "./constants.js";

export default class Seesaw {
  /** @type {Weight[]} */
  #weights = [];
  #mass;
  #containerElement;
  #plankElement;
  constructor(containerElement, plankElement) {
    this.#mass = getRandomInt();
    this.#containerElement = containerElement;
    this.#plankElement = plankElement;
  }

  addWeight(position, relativeX) {
    const id = crypto.randomUUID();
    const element = this.#createWeightElement(relativeX);
    this.#weights.push({ id, mass: this.#mass, position, element });
    this.#render();
    this.#mass = getRandomInt();
  }

  #createWeightElement(position) {
    const size =
      CONSTANTS.WEIGHT_SIZE_BASE +
      this.#mass * CONSTANTS.WEIGHT_SIZE_MULTIPLIER;
    const el = document.createElement("div");
    el.className = "weight";
    el.style.left = `${position}px`;
    el.textContent = `${this.#mass}kg`;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.backgroundColor = getRandomColor();

    this.#containerElement.appendChild(el);
    return el;
  }

  get torque() {
    return this.#weights.reduce((acc, w) => acc + w.mass * w.position, 0);
  }

  get angle() {
    const rawAngle = this.torque * CONSTANTS.SENSITIVITY;
    return Math.max(
      -CONSTANTS.MAX_ANGLE,
      Math.min(CONSTANTS.MAX_ANGLE, rawAngle)
    );
  }

  #render() {
    requestAnimationFrame(() => {
      this.#plankElement.style.transform = `translate(-50%, -50%) rotate(${this.angle}deg)`;

      const angleRad = (this.angle * Math.PI) / 180;
      this.#weights.map((weight) => {
        const offsetX = weight.position * Math.cos(angleRad);
        const offsetY = weight.position * Math.sin(angleRad);
        weight.element.style.top = `calc(50% + ${offsetY}px)`;
        weight.element.style.left = `calc(50% + ${offsetX}px)`;
      });
    });
  }
}
