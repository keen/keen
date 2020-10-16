const NAMESPACE = 'http://www.w3.org/2000/svg';

type TextSettings = {
  fontFamily: string;
  fontSize: number;
};

/**
 * Renders SVG text element to get it dimensions
 *
 * @param text - text to render
 * @param fontFamily - font family
 * @param fontSize - font size
 * @return bbox dimensions
 *
 */
const getTextBBox = (text: string, { fontSize, fontFamily }: TextSettings) => {
  const svgElement = document.createElementNS(NAMESPACE, 'svg');
  svgElement.setAttribute('width', '0');
  svgElement.setAttribute('height', '0');

  const textElement = document.createElementNS(NAMESPACE, 'text');

  textElement.setAttribute(
    'style',
    `
    font-size: ${fontSize}px;
    font-family: "${fontFamily}";
  `
  );

  textElement.textContent = text;

  svgElement.appendChild(textElement);
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(svgElement);

  const bbox = textElement.getBBox();
  svgElement.remove();

  return bbox;
};

export default getTextBBox;
