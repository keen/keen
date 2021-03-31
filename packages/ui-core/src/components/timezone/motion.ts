export const dropdownMotion = {
  bottom: {
    initial: { opacity: 0, y: 20, x: '-50%' },
    animate: { opacity: 1, y: 2 },
    exit: { opacity: 0, y: 30 },
  },
  top: {
    initial: { opacity: 0, y: -20, x: '-50%' },
    animate: { opacity: 1, y: -2 },
    exit: { opacity: 0, y: -30 },
  },
};
