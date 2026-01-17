import { getRandomColor } from "/utils.js";
import { getRandomInt } from "/utils.js";
import { CONSTANTS } from "./constants.js";
import Weight from "./Weight.js";

export default class Seesaw {
  weights = [];
  #containerElement;
  #plankElement;
  nextWeight;
  constructor(containerElement, plankElement) {
    this.#containerElement = containerElement;
    this.#plankElement = plankElement;
    this.#prepareNextWeight();
  }

  addWeightOnClick(clientX) {
    const { offsetFromCenter, relativeX } = this.calculatePosition(clientX);
    const weight = new Weight(
      this.nextWeight.mass,
      this.nextWeight.bgColor,
      offsetFromCenter,
      relativeX,
    );
    this.weights.push(weight);
    this.#containerElement.appendChild(weight.element);
    const result = {
      offsetFromCenter,
      mass: this.nextWeight.mass,
    };
    this.#render();
    this.#prepareNextWeight();
    return result;
  }

  calculatePosition(clientX) {
    const rect = this.#containerElement.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const offsetFromCenter = relativeX - rect.width / 2;
    return { relativeX, offsetFromCenter };
  }

  #prepareNextWeight() {
    this.nextWeight = {
      mass: getRandomInt(),
      bgColor: getRandomColor(),
    };
  }

  #render() {
    requestAnimationFrame(() => {
      this.#plankElement.style.transform = `translate(-50%, -50%) rotate(${this.angle}deg)`;
      const angleRad = (this.angle * Math.PI) / 180;
      this.weights.forEach((weight) => weight.updatePosition(angleRad));
    });
  }

  reset() {
    this.weights.forEach((weight) => {
      weight.element.remove();
    });
    this.weights = [];
    this.#render();
  }

  get leftWeight() {
    return this.weights.reduce(
      (acc, w) => (w.offsetFromCenter < 0 ? acc + w.mass : acc),
      0,
    );
  }

  get rightWeight() {
    return this.weights.reduce(
      (acc, w) => (w.offsetFromCenter > 0 ? acc + w.mass : acc),
      0,
    );
  }

  get torque() {
    return this.weights.reduce(
      (acc, w) => acc + w.mass * w.offsetFromCenter,
      0,
    );
  }

  get angle() {
    const rawAngle = this.torque * CONSTANTS.SENSITIVITY;
    return Math.max(
      -CONSTANTS.MAX_ANGLE,
      Math.min(CONSTANTS.MAX_ANGLE, rawAngle),
    );
  }
}
