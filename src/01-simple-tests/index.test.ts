import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 5, b: 3, action: Action.Add };
    const result = simpleCalculator(input);
    expect(result).toBe(8);
  });

  test('should subtract two numbers', () => {
    const input = { a: 5, b: 3, action: Action.Subtract };
    const result = simpleCalculator(input);
    expect(result).toBe(2);
  });

  test('should multiply two numbers', () => {
    const input = { a: 5, b: 3, action: Action.Multiply };
    const result = simpleCalculator(input);
    expect(result).toBe(15);
  });

  test('should divide two numbers', () => {
    const input = { a: 6, b: 3, action: Action.Divide };
    const result = simpleCalculator(input);
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Exponentiate };
    const result = simpleCalculator(input);
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const input = { a: 2, b: 3, action: '%' };
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const invalidArgs = [
      { a: '5', b: 3 },
      { a: 5, b: null },
      { a: null, b: 3 },
      { a: '5', b: '3' },
    ];
    const actions = Object.values(Action) as Action[];

    invalidArgs.forEach((args) => {
      actions.forEach((action) => {
        const input = { ...args, action };
        const result = simpleCalculator(input);
        expect(result).toBeNull();
      });
    });
  });
});
