import { getRandomColor } from "/utils.js";
import { getRandomInt } from "/utils.js";
import { CONSTANTS } from "./constants.js";
import Weight from "./Weight.js";

export default class Seesaw {
  #weights = [];
  #containerElement;
  #plankElement;
  #weightData;
  constructor(containerElement, plankElement) {
    this.#containerElement = containerElement;
    this.#plankElement = plankElement;
    this.#prepareNextWeight();
  }

  addWeightOnClick(offsetFromCenter, relativeX) {
    const weight = new Weight(
      this.#weightData.mass,
      this.#weightData.bgColor,
      offsetFromCenter,
      relativeX
    );
    this.#weights.push(weight);
    this.#containerElement.appendChild(weight.element);
    this.#render();

    this.#prepareNextWeight();
  }

  #prepareNextWeight() {
    this.#weightData = {
      mass: getRandomInt(),
      bgColor: getRandomColor(),
    };
  }

  #render() {
    requestAnimationFrame(() => {
      this.#plankElement.style.transform = `translate(-50%, -50%) rotate(${this.angle}deg)`;
      const angleRad = (this.angle * Math.PI) / 180;
      this.#weights.forEach((weight) => weight.updatePosition(angleRad));
    });
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
}
