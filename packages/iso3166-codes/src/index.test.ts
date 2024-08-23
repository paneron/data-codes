import { codes } from './index';

test('There are 249 codes', () => {
  expect(codes.length).toBe(249);
});

test('Each element has the right properties', () => {
  codes.forEach((code) => {
    expect(Object.keys(code)).toEqual([
      'Alpha4 Code',
      'Validity Start Date',
      'Code Type',
      'Alpha-2 code',
      'Notifiable',
      'English short name',
      'Code Short',
      'Title',
      'Validity End Date',
      'Uri',
      'Name Short',
      'French short name',
      'Numeric',
      'Urn',
      'Alpha-3 code',
      'Status Remark',
      'Part3 Remark_fr',
      'Content Holder',
      'Part3 Remark_en',
      'Status',
    ]);
  })
});

test('No value is null', () => {
  codes.forEach((code) => {
    Object.values(code).forEach((v) => expect(v).not.toBeNull());
  })
});

test('No value is undefined', () => {
  codes.forEach((code) => {
    Object.values(code).forEach((v) => expect(v).not.toBeUndefined());
  })
});

test('No value is NaN', () => {
  codes.forEach((code) => {
    Object.values(code).forEach((v) => expect(v).not.toBeNaN());
  })
});

test('All values are strings', () => {
  codes.forEach((code) => {
    Object.values(code).forEach((v) => expect(typeof v).toBe('string'));
  })
});
