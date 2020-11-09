import { select } from 'd3-selection';

const fitText = (textElement: SVGTextElement, maxDimension: number) => {
  const element = select(textElement);
  let textLength = element.node().getComputedTextLength();
  let text = element.text();

  while (textLength > maxDimension && text.length > 0) {
    text = text.slice(0, -1);
    element.text(text + '...');
    textLength = element.node().getComputedTextLength();
  }
};

export default fitText;
