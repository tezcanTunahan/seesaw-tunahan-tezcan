import { CONSTANTS } from "./constants.js";

const dropSound = new Audio(CONSTANTS.dropSoundUrl);
dropSound.volume = 0.2;

export const playDropSound = () => {
  dropSound.currentTime = 0;

  dropSound.play().catch((err) => {
    console.warn("drop sound error: ", err);
  });
};
