import numeral from 'numeral';

export const formatByPattern = (
  pattern: string,
  value: string | number | Date
) => {
  const variableRegex = /\${(.*?)}+/;
  const variable = pattern.match(variableRegex);
  if (variable) {
    const [variableType, formatString] = variable[1].split(/,(.+)/);
    let parsedValue = value;
    if (variableType === 'number') {
      parsedValue = numeral(value).format(formatString);
    }
    return pattern.replace(variable[0], parsedValue.toString());
  }
  return value.toString();
};
