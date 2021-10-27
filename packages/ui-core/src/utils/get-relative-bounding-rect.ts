/**
 * Gets child width and relative position from parent element
 *
 * @param parentId - id of relative element
 * @param child - target HTML element
 * @return DOM rectangle position calculated relative to parent
 *
 */
export const getRelativeBoundingRect = (
  parentId: string,
  child: HTMLElement
): Partial<DOMRect> => {
  const parentElement = document.getElementById(parentId);
  const parentRect = parentElement.getBoundingClientRect();
  const { top, left, right, bottom, width } = child.getBoundingClientRect();

  return {
    top: top - parentRect.top,
    left: left - parentRect.left,
    right: right - parentRect.right,
    bottom: bottom - parentRect.bottom,
    width,
  };
};
