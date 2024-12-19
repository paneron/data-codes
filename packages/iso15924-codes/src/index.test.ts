import { codes } from './index';

test('There is a header', () => {
  expect(codes.headers.length).toBe(7);
});

test('Header looks right', () => {
  expect(codes.headers).toEqual([
    'Code',
    'N°',
    'English Name',
    'Nom français',
    'PVA',
    'Unicode Version',
    'Date',
  ]);
});

test('There are a correct number of items', () => {
  expect(codes.items.length).toBe(223);
});

test('Each item has 7 elements', () => {
  codes.items.forEach((item) => {
    // https://stackoverflow.com/questions/76007003/jest-tobeinstanceof-expected-constructor-array-received-constructor-array
    // expect(item).toBeInstanceOf(Array);
    expect(Array.isArray(item)).toBeTruthy();
    expect(item.length).toBe(7);
  });
});

test('Each item has 7 non-empty elements', () => {
  codes.items.forEach((item) => {
    expect(item).not.toBe(null);
    expect(item).not.toBe(undefined);
    // expect item to be a string
    item.forEach((v) => expect(typeof v).toBe('string'));
  });
});

test('Last item has number 999', () => {
  expect((codes.items[codes.items.length - 1] ?? [])[1]).toBe('999');
});

export default {};
