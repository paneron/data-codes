import * as fs from 'node:fs';

// import tab from '../src/data/iso-639-3_Name_Index.tab';
// import tsv from '../src/data/iso639-5.tsv';

const dataDir = './src/data';

export function parseTsv(text: string) {
  const lines = text.split('\n');
  const itemSeparator = '\t';
  const headers = (lines[0] ?? '').split(itemSeparator);
  const items = lines
    .slice(1)
    .filter((l) => l.length > 0)
    .map((l) => {
      return l.split(itemSeparator);
    });

  const result = {
    headers,
    items,
  };

  return result;
}

export function parse6393tab(text: string) {
  return parseTsv(text);
}

export function parse6395tsv(text: string) {
  return parseTsv(text);
}

let codeCache: ReturnType<typeof combine6393tabAnd6395tsv> | null = null;

export function combine6393tabAnd6395tsv() {
  const iso6393Codes = get6393Codes();
  const iso6395Codes = get6395Codes();

  const result = {
    headers : [
      'Code',
      'Print_Name-en',
      'Part',
      'Label-fr',
      'Inverted_Name-en',
      'URI',
    ],

    items : iso6393Codes.items
      .map((item, i) => {
        if (typeof item[1] === 'undefined') {
          console.warn('undefined warning', item, i);
        }
        return [item[0], item[1], '3', '', item[2], ''];
      })
      .concat(
        iso6395Codes.items.map((item) => {
          return [item[1], item[2], '5', item[3], '', item[0]];
        }),
      ),
  };

  return result;
}

export function getCombinedCodes() {
  if (codeCache) {
    return codeCache;
  }
  codeCache = combine6393tabAnd6395tsv();
  return codeCache;
}

let tabCache: ReturnType<typeof parse6393tab> | null = null;
export function get6393Codes() {
  if (tabCache) {
    return tabCache;
  }
  tabCache = parse6393tab(tab as unknown as string);
  return tabCache;
}

let tsvCache: ReturnType<typeof parse6395tsv> | null = null;
export function get6395Codes() {
  if (tsvCache) {
    return tsvCache;
  }
  tsvCache = parse6395tsv(tsv as unknown as string);
  return tsvCache;
}

const tab = fs.readFileSync(`${dataDir}/iso-639-3_Name_Index.tab`).toString();
const tsv = fs.readFileSync(`${dataDir}/iso639-5.tsv`).toString();

const text = JSON.stringify(getCombinedCodes());

fs.writeFileSync(`${dataDir}/iso639-codes.json`, text);
