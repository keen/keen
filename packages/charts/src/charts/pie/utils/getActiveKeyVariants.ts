export const getActiveKeyVariants = (x: number, y: number) => ({
  initial: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  inactive: {
    opacity: 0.2,
    x: 0,
    y: 0,
  },
  active: {
    opacity: 1,
    x,
    y,
  },
});
