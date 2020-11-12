import { select } from 'd3-selection';

import getRotatedDimension from './get-rotated-dimension';
import createElementIdSelector from './create-element-id-selector';

import { Axis, Orientation } from '../../../types';

type Options = {
  /** Root visualization element */
  svgElement: SVGElement;
  /** Axis theme settings */
  axisTheme: Axis;
  /** Axis orientation */
  orientation: Orientation;
  /** Axis title  */
  axisTitle?: string;
};

/**
 * Calculates computed dimension of all axis elements.
 *
 * @param svgElement - root svg element
 * @param axisTheme - axis theming
 * @param orientation - axis orientation
 * @param axisTitle - axis title
 * @return width and height of axis elements group
 *
 */
const calculateAxisDimension = ({
  axisTheme,
  axisTitle,
  svgElement,
  orientation,
}: Options): Partial<DOMRect> => {
  const {
    enabled: axisEnabled,
    padding,
    tickSize,
    tickPadding,
    title: { padding: titlePadding },
    labels: { enabled: labelsEnabled, radiusAngle },
  } = axisTheme;

  const rootContainer = select(svgElement);

  const labelsSelector = createElementIdSelector(`${orientation}-ruler-label`);
  const titleSelector = createElementIdSelector(`${orientation}-axis-title`);

  let maxLabel = '';
  let longestNode: SVGTextElement = null;

  rootContainer
    .selectAll(labelsSelector)
    .nodes()
    .forEach(node => {
      const labelElement = select(node);
      const text = labelElement.text();

      if (text.length > maxLabel.length) {
        maxLabel = text;
        longestNode = node as SVGTextElement;
      }
    });

  const textDimension = longestNode
    ? longestNode.getBBox()
    : {
        width: 0,
        height: 0,
      };

  let dimension = { width: 0, height: 0 };

  if (axisEnabled && labelsEnabled) {
    dimension = getRotatedDimension({ radiusAngle, dimension: textDimension });
  }

  if (axisTitle) {
    const titleElement = rootContainer.select(titleSelector);
    const titleBbox = titleElement
      ? (titleElement.node() as SVGTextElement).getBBox()
      : {
          width: 0,
          height: 0,
        };

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
