/**
 * Copy provided value to clipboard.
 *
 * @param value - value to copy
 * @return void
 *
 */
const copyToClipboard = (value: any) => {
  const placeholder = document.createElement('input');
  placeholder.value = value;
  document.body.appendChild(placeholder);
  placeholder.select();
  document.execCommand('copy');
  document.body.removeChild(placeholder);
};

export default copyToClipboard;
