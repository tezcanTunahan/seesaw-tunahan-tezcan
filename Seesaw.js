import { getRandomColor, getRandomInt } from "./utils.js";
import { playDropSound } from "./sound.js";
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
    this.#load();
    this.#prepareNextWeight();
  }

  addWeight(clientX) {
    playDropSound();
    const { offsetFromCenter, relativeX } = this.#calculatePosition(clientX);
    const weight = new Weight(
      this.nextWeight.mass,
      this.nextWeight.bgColor,
      offsetFromCenter,
      relativeX,
    );
    this.weights.push(weight);
    this.#containerElement.appendChild(weight.element);

    this.#render();
    this.#prepareNextWeight();
    this.#save();
  }

  #calculatePosition(clientX) {
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
    localStorage.removeItem("seesaw_weights");
    this.weights = [];
    this.#render();
  }

  #save() {
    localStorage.setItem("seesaw_weights", JSON.stringify(this.weights));
  }
  #load() {
    const savedData = localStorage.getItem("seesaw_weights");
    if (!savedData) return;
    try {
      const parsedData = JSON.parse(savedData);
      this.weights = parsedData.map((data) => {
        const weightInstance = new Weight(
          data.mass,
          data.bgColor,
          data.offsetFromCenter,
          data.relativeX,
        );
        this.#containerElement.appendChild(weightInstance.element);
        return weightInstance;
      });
      this.#render();
    } catch (e) {
      console.error("seesaw_weights localStorage error:", e);
      localStorage.removeItem("seesaw_weights");
    }
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
