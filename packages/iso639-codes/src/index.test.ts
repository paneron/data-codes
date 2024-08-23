import { codes } from './index';

test('There is a header', () => {
  expect(codes.headers.length).toBe(6);
});

test('Header looks right', () => {
  expect(codes.headers).toEqual(
    [
      'Code',
      'Print_Name-en',
      'Part',
      'Label-fr',
      'Inverted_Name-en',
      'URI',
    ]
  );
});

test('There are a correct number of items', () => {
  expect(codes.items.length).toBe(8405);
});

test('Each item has 6 elements', () => {
  codes.items.forEach((item) => {
    expect(item).toBeInstanceOf(Array);
    expect(item.length).toBe(6);
  })
});

test('Each item has only non-null elements', () => {
  codes.items.forEach((item) => {
    expect(item).not.toBe(null);
  })
});

test('Each item has only defined elements', () => {
  codes.items.forEach((item) => {
    expect(item).not.toBe(undefined);
  })
});

test('Each item has only String elements', () => {
  codes.items.forEach((item) => {
    item.forEach((v) => expect(typeof v).toBe('string'));
  })
});

export default {};
