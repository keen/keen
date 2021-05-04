#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */
const { Command } = require('commander');
const fs = require('fs');
const https = require('https');
const merge = require('deepmerge');
const { addedDiff } = require('deep-object-diff');

const program = new Command();

program
  .version('1.0.0')
  .arguments('<SOURCE_DIR> <TARGET_FILE>')
  .description('', {
    SOURCE_DIR: 'dir with translation file',
    TARGET_FILE: 'translation file to merge with(url or local file)',
  })
  .action((SOURCE_DIR: string, TARGET_FILE: string) => {
    try {
      const sourceData = JSON.parse(
        fs.readFileSync(`${SOURCE_DIR}/translation.json`)
      );
      let targetData = '';
      if (TARGET_FILE.includes('http')) {
        https.get(TARGET_FILE, (resp: any) => {
          resp.on('data', (chunk: any) => {
            targetData += chunk;
          });

          resp.on('end', () => {
            const parsedTargetData = JSON.parse(targetData);
            const mergedData = merge(sourceData, parsedTargetData);
            fs.writeFile(
              `${SOURCE_DIR}/output.json`,
              JSON.stringify(mergedData, null, 2),
              function () {
                console.log(addedDiff(sourceData, mergedData));
              }
            );
          });
        });
      } else {
        targetData = JSON.parse(fs.readFileSync(`${TARGET_FILE}`));
        const mergedData = merge(sourceData, targetData);
        fs.writeFile(
          `${SOURCE_DIR}/output.json`,
          JSON.stringify(mergedData, null, 2),
          function () {
            console.log(addedDiff(sourceData, mergedData));
          }
        );
      }
    } catch (err) {
      console.error(err);
    }
  });

program.parse();
