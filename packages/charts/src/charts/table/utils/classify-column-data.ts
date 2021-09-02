/**
 * Classifies data in table column
 *
 * @param columnName - column name
 * @param data - data series
 * @return classified data type
 *
 */
export const classifyColumnData = (
  columnName: string,
  data: Record<string, any>[]
) => {
  const dataTypes: Record<string, number> = {};
  const specifyDataType = (type: string) => {
    if (dataTypes[type]) dataTypes[type] = dataTypes[type] + 1;
    else dataTypes[type] = 1;
  };

  data
    .map((rowProperties) => rowProperties[columnName])
    .forEach((value) => {
      if (value !== null) specifyDataType(typeof value);
    });

  const maximumOccurencies = Math.max(...Object.values(dataTypes));

  const [dataType] = Object.keys(dataTypes).filter(
    (keyName: string | null) => dataTypes[keyName] === maximumOccurencies
  );

  if (dataType) return dataType;
  return null;
};
