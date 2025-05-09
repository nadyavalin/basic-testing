import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const mockRelativePath = '/posts/1';
  const mockResponseData = { id: 1, title: 'Test Post' };
  const baseURL = 'https://jsonplaceholder.typicode.com';

  beforeEach(() => {
    jest.clearAllMocks();
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
    });
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(mockRelativePath);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(mockRelativePath);

    const axiosClient = (axios.create as jest.Mock).mock.results[0]!.value;

    expect(axiosClient.get).toHaveBeenCalledWith(mockRelativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(mockRelativePath);

    expect(result).toEqual(mockResponseData);
  });
});
