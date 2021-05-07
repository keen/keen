# `@keen.io/translations-cli`

[![Known Vulnerabilities](https://snyk.io/test/github/keen/keen/badge.svg?targetFile=packages/query/package.json)](https://snyk.io/test/github/keen/keen?targetFile=packages/utils/package.json)

CLI allowing to merge translations jsons into one.

## Installing

Can be installed globally with yarn:

```sh
yarn global @keen.io/translations-cli
```

or npm:

```sh
npm install -g @keen.io/translations-cli
```

## Examples

After installation can be run with command:

```sh
keen-translations <SOURCE_DIR> <TARGET_FILE>
```

To run it, two arguments need to be set, SOURCE_DIR and TARGET_FILE. The script will take translations from TARGET_FILE(api call or json file) and merge it with translations locally, available in SOURCE_DIR. In the end in terminal diff between the files will be printed and in SOURCE_DIR new file will be created with two files merged(output.json);

Example:

```sh
keen-translations explorer/public/locales/en https://cdn.jsdelivr.net/npm/@keen.io/dashboard-creator@next/dist/locales/en/translation.json
```

```sh
keen-translations explorer/public/locales/en dashboard-creator/public/locales/en/translation.json
```
