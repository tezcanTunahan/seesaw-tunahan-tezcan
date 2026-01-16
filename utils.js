export function getRandomMass() {
  return Math.floor(Math.random() * 10) + 1;
}

export function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70;
  const lightness = 60;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
