import 'reflect-metadata';
import { EMAIndicator } from '../../src/indicator/emaIndicator';
import { SMAIndicator } from '../../src/indicator/smaIndicator';

describe('emaIndicator', () => {
  const smaIndicator = new SMAIndicator();
  const emaIndicator = new EMAIndicator(smaIndicator);

  describe('to throw error on', () => {
    test('calculation with too less data', () => {
      let data = [22.3, 34.3, 21, 23.2];
      expect(() => emaIndicator.execute(data, { length: 10 })).toThrowError('Not enough data to calculate the EMA of length 10');
    });

    test('calculation with configured length of zero', () => {
      let data = [22.3, 34.3, 21, 23.2];
      expect(() => emaIndicator.execute(data, { length: 0 })).toThrowError('The EMA length should be greater than zero');
    });
  });

  test('calculation with small length', () => {
    let data = [10, 20, 30, 40, 50];
    expect(emaIndicator.execute(data, { length: 3 })).toStrictEqual([20, 30, 40]);
  });

  test('calculation with enough data', () => {
    let data = [22.3, 34.3, 21, 23.2, 24.5, 27, 29.03, 34.2, 36, 40.1, 42.1, 41.0, 39.3, 24.2, 39.9, 40, 41.8];
    expect(emaIndicator.execute(data, { length: 10 })).toStrictEqual([29.16, 31.51, 33.24, 34.34, 32.5, 33.85, 34.97, 36.21]);
  });

  test('calculation with set precision to three', () => {
    let data = [22.3, 34.3, 21, 23.2, 24.5, 27, 29.03, 34.2, 36, 40.1, 42.1, 41.0, 39.3, 24.2, 39.9, 40, 41.8];
    expect(emaIndicator.execute(data, { length: 10, precision: 3 })).toStrictEqual([29.16, 31.513, 33.238, 34.34, 32.496, 33.842, 34.962, 36.205]);
  });
});
