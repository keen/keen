import getTextBBox from './get-text-bbox';

import { Axis, Orientation } from '../../../types';

type Options = {
  /** The longest formatted label */
  label: string;
  /** Axis theme settings */
  axisTheme: Axis;
  /** Axis orientation */
  orientation: Orientation;
  /** Axis title  */
  axisTitle?: string;
};

const calculateAxisDimension = ({
  label,
  axisTheme,
  axisTitle,
  orientation,
}: Options): Partial<DOMRect> => {
  const {
    enabled: axisEnabled,
    padding,
    tickSize,
    tickPadding,
    title: { typography: titleTypography, padding: titlePadding },
    labels: {
      enabled: labelsEnabled,
      typography: { fontSize, fontFamily },
    },
  } = axisTheme;

  const textDimension =
    axisEnabled && labelsEnabled
      ? getTextBBox(label, {
          fontSize,
          fontFamily,
        })
      : {
          width: 0,
          height: 0,
        };

  let dimension = textDimension;

  if (axisTitle) {
    const titleBbox = getTextBBox(axisTitle, {
      fontSize: titleTypography.fontSize,
      fontFamily: titleTypography.fontFamily,
    });

    if (orientation === Orientation.VERTICAL) {
      dimension = {
        height: dimension.height,
        width: dimension.width + titleBbox.height + titlePadding,
      };
    } else {
      dimension = {
        width: dimension.width,
        height: dimension.height + titleBbox.height + titlePadding,
      };
    }
  }

  if (axisEnabled) {
    const { width, height } = dimension;
    if (orientation === Orientation.VERTICAL) {
      dimension = {
        width: width + tickSize + tickPadding + padding,
        height,
      };
    } else {
      dimension = {
        width: width,
        height:
          height +
          Math.abs(tickSize + tickPadding - textDimension.height) +
          padding,
      };
    }
  }

  return dimension;
};

export default calculateAxisDimension;
