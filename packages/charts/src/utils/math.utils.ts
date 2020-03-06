export const calculateHypotenuse = (
  x: number,
  y: number,
  radius: number
): [number, number] => {
  const height = Math.sqrt(x * x + y * y);
  return [(x / height) * radius, (y / height) * radius];
};
