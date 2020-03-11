import React, { FC } from 'react';
export declare const hoverBarMotion: {
  initial: {
    opacity: number;
  };
  animate: {
    opacity: number;
  };
  transition: {
    duration: number;
  };
  exit: {
    opacity: number;
  };
};
declare type Props = {
  x: number;
  y?: number;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
};
declare const HoverBar: FC<Props>;
export default HoverBar;
