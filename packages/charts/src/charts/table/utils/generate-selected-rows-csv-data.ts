import { DataExport } from '@keen.io/data-export';

type Props = {
  selectedRows: Record<string, any>[];
  columnsKeys: string[];
  columnsNamesMapping?: Record<string, string>;
  addColumnNames?: boolean;
};

export const generateSelectedRowsCSVData = ({
  selectedRows,
  columnsKeys,
  columnsNamesMapping = {},
  addColumnNames,
}: Props) => {
  const parsedElements = [];

  if (addColumnNames) {
    const columnNames = columnsKeys.map((columnKey) => {
      if (Object.keys(columnsNamesMapping).includes(columnKey)) {
        return columnsNamesMapping[columnKey];
      }
      return columnKey;
    });
    parsedElements.push(columnNames);
  }

  selectedRows.forEach((row: Record<string, any>) => {
    const parsedRow = columnsKeys.map((columnKey) => {
      const columnValue = row[columnKey].value;
      if (Array.isArray(columnValue)) {
        return columnValue.toString();
      }
      return columnValue;
    });
    parsedElements.push(parsedRow);
  });
  return DataExport.exportToCSV({ data: parsedElements });
};
