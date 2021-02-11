import { GroupByResult, ParserSettings } from '../../../types';
import { KEEN_KEY } from '../../../constants';

/**
 * Bar transformation
 *
 * @param result - categorical results
 * @param parserSettings - parser settings
 * @return transformed results
 *
 */
export const barTransformation = (
  result: GroupByResult[],
  parserSettings: ParserSettings
) => {
  const mainProperty = parserSettings.mergePropertiesOrder[0];
  const additionalProperties = parserSettings.mergePropertiesOrder.slice(1);
  let parsedResults: Record<string, any>[] = [];
  const generatedKeys: Set<string> = new Set();

  const extractKeyFromRecord = (
    keysToExtract: string[],
    record: GroupByResult
  ) => {
    let recordKey = '';
    keysToExtract.forEach(
      (key) => (recordKey += recordKey !== '' ? '_' + record[key] : record[key])
    );
    return recordKey;
  };

  if (additionalProperties.length === 0) {
    const resultObject: Record<string, any> = {
      [KEEN_KEY]: mainProperty,
    };
    result.forEach((record) => {
      generatedKeys.add(record[mainProperty].toString());
      resultObject[record[mainProperty]] = record.result;
    });
    parsedResults = [resultObject];
  } else {
    result.forEach((record) => {
      const parsedResultIndex = parsedResults.findIndex(
        (data: Record<string, string>) =>
          data[KEEN_KEY] === record[mainProperty]
      );
      const generatedKey = extractKeyFromRecord(additionalProperties, record);
      generatedKeys.add(generatedKey);
      if (parsedResultIndex > -1) {
        return (parsedResults[parsedResultIndex] = {
          ...parsedResults[parsedResultIndex],
          [generatedKey]: record.result,
        });
      }
      parsedResults.push({
        [KEEN_KEY]: record[mainProperty],
        [generatedKey]: record.result,
      });
    });
  }

  return {
    data: parsedResults,
    keys: [...generatedKeys],
  };
};
