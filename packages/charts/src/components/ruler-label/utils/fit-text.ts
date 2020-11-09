import { select } from 'd3-selection';

const fitText = (
  textElement: SVGTextElement,
  label: string,
  maxDimension: number
) => {
  const element = select(textElement);
  let text = label;
  element.text(label);

  let textLength = element.node().getComputedTextLength();
  let isTruncated = false;

  while (textLength > maxDimension && text.length > 0) {
    isTruncated = true;
    text = text.slice(0, -1);
    element.text(text + '...');
    textLength = element.node().getComputedTextLength();
  }

  return {
    isTruncated,
  };
};

export default fitText;
