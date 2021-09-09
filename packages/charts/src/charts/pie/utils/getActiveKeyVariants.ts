export const getActiveKeyVariants = (x: number, y: number) => ({
  default: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  initial: {
    opacity: 0,
    x: 0,
    y: 0,
    trasition: {
      delay: 0,
      duration: 0,
    },
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
  offsetChange: {
    opacity: 1,
    transition: {
      delay: 0,
      duration: 0.5,
    },
  },
});
