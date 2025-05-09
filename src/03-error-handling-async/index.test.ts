import {
  resolveValue,
  throwError,
  throwCustomError,
  rejectCustomError,
  MyAwesomeError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value1 = 37;
    const value2 = 'hello';
    const value3 = { key: 'value' };
    const value4 = null;

    await expect(resolveValue(value1)).resolves.toBe(37);
    await expect(resolveValue(value2)).resolves.toBe('hello');
    await expect(resolveValue(value3)).resolves.toEqual({ key: 'value' });
    await expect(resolveValue(value4)).resolves.toBeNull();
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'Custom error message';
    expect(() => throwError(message)).toThrow('Custom error message');
    expect(() => throwError(message)).toThrow(Error);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops');
    expect(() => throwError()).toThrow(Error);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
    expect(() => throwCustomError()).toThrow(
      'This is my awesome custom error!',
    );
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});
