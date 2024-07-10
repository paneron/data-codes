export function parse15924Txt(text: string) {
  const headerRE = /^#\s*(Code;.*)/m;
  const itemRE = /(^[^#].+$)/;
  const itemSeparator = ';';

  const headers = ((text.match(headerRE) ?? [''])[1] ?? '')
    .split(itemSeparator);
  const items = text
    .split("\n")
    .filter((l) => l.match(itemRE))
    .map((l) => l.split(itemSeparator));

  const result = {
    headers,
    items,
  };

  return result;
}

import rawCodes from '@/data/iso15924.txt';

let cache: ReturnType<typeof parse15924Txt> | null = null;
export function getCodes() {
  if (cache) {
    return cache;
  }
  cache = parse15924Txt(rawCodes as unknown as string);
  return cache;
}

export const codes = getCodes();
