import { Orientation, LabelRotation } from '../../../../types';

const rotateLabel = (
  orientation: string,
  radiusAngle: number,
  tickPadding: number,
  tickSize: number
): LabelRotation => {
  if (radiusAngle) {
    if (orientation === Orientation.VERTICAL) {
      switch (radiusAngle) {
        case 90:
          return {
            anchor: 'middle',
            radius: radiusAngle,
            translateX: -tickPadding + 5,
            translateY: tickPadding / 2,
          };

        case -90:
          return {
            anchor: 'middle',
            radius: radiusAngle,
            translateX: -tickPadding / 2,
            translateY: -tickPadding - 5,
          };

        case -60:
          return {
            anchor: 'end',
            radius: radiusAngle,
            translateX: tickPadding / 2 - 2,
            translateY: -tickPadding,
          };

        default:
          return radiusAngle < 0
            ? {
                anchor: 'end',
                radius: radiusAngle,
                translateX: tickPadding / 2,
                translateY: -tickPadding / 2 - 2,
              }
            : {
                anchor: 'end',
                radius: radiusAngle,
                translateX: -tickPadding + 5,
                translateY: 0,
              };
      }
    } else {
      switch (radiusAngle) {
        case 90:
          return {
            anchor: 'start',
            radius: radiusAngle,
            translateX: tickPadding + tickSize - 4,
            translateY: tickPadding + tickSize - 2,
          };

        case -90:
          return {
            anchor: 'end',
            radius: radiusAngle,
            translateX: -(tickPadding + tickSize) + 2,
            translateY: tickPadding + tickSize - 5,
          };

        case -25:
          return {
            anchor: 'end',
            radius: radiusAngle,
            translateX: -tickPadding + 5,
            translateY: tickPadding - 5,
          };

        default:
          return radiusAngle < 0
            ? {
                anchor: 'end',
                radius: radiusAngle,
                translateX: -tickPadding,
                translateY: tickPadding - 5,
              }
            : {
                anchor: 'start',
                radius: radiusAngle,
                translateX: tickPadding - 5,
                translateY: tickPadding - 5,
              };
      }
    }
  }

  return {
    anchor: orientation === Orientation.HORIZONTAL ? 'middle' : 'end',
    radius: 0,
    translateX: 0,
    translateY: 0,
  };
};

export default rotateLabel;
