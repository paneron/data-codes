import * as fs from 'node:fs';

const dataDir = './src/data';

export function parse15924Txt(text: string) {
  const headerRE = /^#\s*(Code;.*)/m;
  const itemRE = /(^[^#].+$)/;
  const itemSeparator = ';';

  const headers = ((text.match(headerRE) ?? [''])[1] ?? '').split(
    itemSeparator,
  );
  const items = text
    .split('\n')
    .filter((l) => l.match(itemRE))
    .map((l) => l.split(itemSeparator));

  const result = {
    headers,
    items,
  };

  return result;
}

const rawCodes = fs.readFileSync(`${dataDir}/iso15924.txt`).toString();

const text = JSON.stringify(parse15924Txt(rawCodes));

fs.writeFileSync(`${dataDir}/iso15924-codes.json`, text);
