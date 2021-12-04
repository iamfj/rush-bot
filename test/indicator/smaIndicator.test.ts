import 'reflect-metadata';
import { SMAIndicator } from '../../src/indicator/smaIndicator';

describe('smaIndicator', () => {
  const smaIndicator = new SMAIndicator();

  describe('to throw error on', () => {
    test('calculation with too less data', () => {
      let data = [22.3, 34.3, 21, 23.2];
      expect(() => smaIndicator.execute(data, { length: 10 })).toThrowError('Not enough data to calculate the SMA of length 10');
    });

    test('calculation with configured length of zero', () => {
      let data = [22.3, 34.3, 21, 23.2];
      expect(() => smaIndicator.execute(data, { length: 0 })).toThrowError('The SMA length should be greater than zero');
    });
  });

  test('calculation with small length', () => {
    let data = [10, 20, 30, 40, 50];
    expect(smaIndicator.execute(data, { length: 3 })).toStrictEqual([20, 30, 40]);
  });

  test('calculation with enough data', () => {
    let data = [22.3, 34.3, 21, 23.2, 24.5, 27, 29.03, 34.2, 36, 40.1, 42.1, 41.0, 39.3, 24.2, 39.9, 40, 41.8];
    expect(smaIndicator.execute(data, { length: 10 })).toStrictEqual([29.16, 31.14, 31.81, 33.64, 33.74, 35.28, 36.58, 37.86]);
  });

  test('calculation with set precision to three', () => {
    let data = [22.3, 34.3, 21, 23.2, 24.5, 27, 29.03, 34.2, 36, 40.1, 42.1, 41.0, 39.3, 24.2, 39.9, 40, 41.8];
    expect(smaIndicator.execute(data, { length: 10, precision: 3 })).toStrictEqual([29.163, 31.143, 31.813, 33.643, 33.743, 35.283, 36.583, 37.86]);
  });
});
