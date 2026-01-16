import { getRandomColor } from "/utils.js";
import { CONSTANTS } from "/constants.js";
export default class Weight {
  mass;
  offsetFromCenter;
  element;
  constructor(mass, offsetFromCenter, relativeX) {
    this.mass = mass;
    this.offsetFromCenter = offsetFromCenter;
    this.element = this.#createElement(relativeX);
  }

  #createElement(relativeX) {
    const size =
      CONSTANTS.WEIGHT_SIZE_BASE + this.mass * CONSTANTS.WEIGHT_SIZE_MULTIPLIER;
    const el = document.createElement("div");
    el.className = "weight";
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.backgroundColor = getRandomColor();
    el.style.left = `${relativeX}px`;
    el.textContent = `${this.mass}kg`;
    return el;
  }

  updatePosition(angleRad) {
    const offsetX = this.offsetFromCenter * Math.cos(angleRad);
    const offsetY = this.offsetFromCenter * Math.sin(angleRad);
    this.element.style.top = `calc(50% + ${offsetY}px)`;
    this.element.style.left = `calc(50% + ${offsetX}px)`;
  }
}
