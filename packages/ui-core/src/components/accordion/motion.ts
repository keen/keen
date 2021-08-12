export const iconMotion = {
  open: {
    rotate: 90,
  },
  close: {
    rotate: 0,
  },
};

export const contentMotion = {
  open: {
    height: 'auto',
    opacity: 1,
    transition: { ease: 'easeInOut', duration: 0.25, delay: 0 },
  },
  close: {
    height: 0,
    opacity: 0,
  },
};
