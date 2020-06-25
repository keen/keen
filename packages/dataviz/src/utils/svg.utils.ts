import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

const FILENAME = 'chart';

export const exportToSvg = ({
  quality,
  backgroundColor,
  node,
}: {
  node: Element;
  quality: number;
  backgroundColor: string;
}) => {
  if (quality) {
    domtoimage
      .toBlob(node, { quality, bgcolor: backgroundColor })
      .then(blob => {
        saveAs(blob, `${FILENAME}.jpeg`);
      });
  } else {
    domtoimage.toBlob(node).then(blob => {
      saveAs(blob, `${FILENAME}.png`);
    });
  }
};
