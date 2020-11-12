import { select } from 'd3-selection';

const TRUNCATE_DOTS_SIZE = 3;

const fitText = (
  textElement: SVGTextElement,
  label: string,
  maxDimension: number
) => {
  let isTruncated = false;

  if (label.length === 0) {
    return { isTruncated };
  }

  const element = select(textElement);
  element.text(label);

  const textLength = element.node().getComputedTextLength();

  if (maxDimension >= textLength) {
    return { isTruncated };
  }

  isTruncated = true;

  const averageCharacterDimension = Math.floor(textLength / label.length);
  const charactersFit = Math.floor(maxDimension / averageCharacterDimension);
  const value = `${label.slice(0, charactersFit - TRUNCATE_DOTS_SIZE)}...`;

  element.text(value);

  return {
    isTruncated,
  };
};

export default fitText;
