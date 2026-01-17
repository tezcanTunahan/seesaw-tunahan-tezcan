export function getRandomInt(min = 1, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70;
  const lightness = 60;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
