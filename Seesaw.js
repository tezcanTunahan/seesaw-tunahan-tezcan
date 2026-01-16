/**
 * @typedef {Object} Weight
 * @property {string} id
 * @property {number} mass
 * @property {number} position
 * @property {HTMLElement} element
 */
import { getRandomColor, getRandomInt } from "/utils.js";
import { CONSTANTS } from "./constants.js";
import Weight from "./Weight.js";

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

  addWeightOnClick(offsetFromCenter, relativeX) {
    const weight = new Weight(this.#mass, offsetFromCenter, relativeX);
    this.#weights.push(weight);
    this.#containerElement.appendChild(weight.element);
    this.#render();
    this.#mass = getRandomInt();
  }

  get torque() {
    return this.#weights.reduce(
      (acc, w) => acc + w.mass * w.offsetFromCenter,
      0
    );
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
      this.#weights.forEach((weight) => weight.updatePosition(angleRad));
    });
  }
}
