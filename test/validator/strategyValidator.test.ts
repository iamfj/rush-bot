import { StrategyValidator } from '../../src/validator/strategyValidator';

describe('strategyValidator', () => {
  const validator = new StrategyValidator();

  test('valid with missing schema', () => {
    const validModule = {
      name: 'strategy',
      label: 'Strategy',
      onTick: jest.fn(),
    };

    expect(() => validator.validate(validModule)).not.toThrowError();
  });

  test('invalid with unknown schema', () => {
    const unknownSchemaModule = {
      name: 'strategy',
      label: 'Strategy',
      schema: 999,
      onTick: jest.fn(),
    };

    expect(() => validator.validate(unknownSchemaModule)).toThrowError('Could not validate strategy schema with version 999');
  });

  describe('schema 1', () => {
    test('valid module', () => {
      const validModule = {
        name: 'strategy',
        label: 'Strategy',
        schema: 1,
        onTick: jest.fn(),
      };

      expect(() => validator.validate(validModule)).not.toThrowError();
    });

    describe('invalid module', () => {
      const invalidModule = {
        schema: 1,
      };

      test('missing name', () => {
        const missingNameModule = {
          ...invalidModule,
          label: 'strategy',
          onTick: jest.fn(),
        };

        expect(() => validator.validate(missingNameModule)).toThrowError('Name is not defined');
      });

      test('missing label', () => {
        const missingLabelModule = {
          ...invalidModule,
          name: 'strategy',
          onTick: jest.fn(),
        };

        expect(() => validator.validate(missingLabelModule)).toThrowError('Label is not defined');
      });

      test('missing onTick method', () => {
        const missingOnTickModule = {
          ...invalidModule,
          name: 'strategy',
          label: 'strategy',
        };

        expect(() => validator.validate(missingOnTickModule)).toThrowError('Method onTick is not defined');
      });
    });
  });
});
