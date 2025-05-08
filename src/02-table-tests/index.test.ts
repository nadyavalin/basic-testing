import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 3, action: Action.Add, expected: 8 },
  { a: -1, b: 4, action: Action.Add, expected: 3 },

  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 2, b: 4, action: Action.Subtract, expected: -2 },
  { a: 0, b: 1, action: Action.Subtract, expected: -1 },

  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: -2, b: 3, action: Action.Multiply, expected: -6 },
  { a: 4, b: 0, action: Action.Multiply, expected: 0 },

  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 5, b: 2, action: Action.Divide, expected: 2.5 },
  { a: 5, b: 0, action: Action.Divide, expected: Infinity },

  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: 0, action: Action.Exponentiate, expected: 1 },

  { a: '5', b: 3, action: Action.Add, expected: null },
  { a: 5, b: null, action: Action.Subtract, expected: null },
  { a: null, b: 3, action: Action.Multiply, expected: null },
  { a: '5', b: '3', action: Action.Divide, expected: null },
  { a: null, b: 3, action: Action.Exponentiate, expected: null },

  { a: 2, b: 3, action: '%', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should handle simpleCalculator cases',
    ({ a, b, action, expected }) => {
      const input = { a, b, action };
      const result = simpleCalculator(input);
      expect(result).toBe(expected);
    },
  );
});
