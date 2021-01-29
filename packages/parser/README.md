# `@keen.io/parser`

[![Known Vulnerabilities](https://snyk.io/test/github/keen/keen/badge.svg?targetFile=packages/parser/package.json)](https://snyk.io/test/github/keen/keen?targetFile=packages/parser/package.json)

This package contains set of parsers that are used internally to transform Keen API responses into `@keen.io/charts` friendly format.

#### Transformations

| Type                              | Query Semantic                                               |
| --------------------------------- | ------------------------------------------------------------ |
| singular                          | `standard` query without additional settings                 |
| categorical                       | `standard` query with group by settings                      |
| nominal                           | simple `select_unique` analysis                              |
| categorical-nominal               | `select_unique` analysis with group by settings              |
| chronological-nominal             | `select_unique` analysis with interval                       |
| chronological-categorical-nominal | `select_unique` analysis with group by settings and interval |
| chronological                     | `standard` query with interval                               |
| categorical-chronological         | `standard` query with group by settings and interval         |
| funnel                            | `funnel` analysis                                            |
| extraction                        | `extraction` analysis                                        |

-   As query is categorized as `standard` when `analysis_type` is different than `select_unique`, `funnel` or `extraction`.
