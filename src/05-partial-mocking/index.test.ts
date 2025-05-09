import { mockOne, mockTwo, mockThree } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  let consoleLogSpy: jest.SpyInstance;
  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(mockOne).toHaveBeenCalled();
    expect(mockTwo).toHaveBeenCalled();
    expect(mockThree).toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const module = jest.requireActual<typeof import('./index')>('./index');
    const unmockedFunctionSpy = jest.spyOn(module, 'unmockedFunction');

    module.unmockedFunction();

    expect(consoleLogSpy).toHaveBeenCalledWith('I am not mocked');
    expect(unmockedFunctionSpy).toHaveBeenCalled();

    unmockedFunctionSpy.mockRestore();
  });
});
