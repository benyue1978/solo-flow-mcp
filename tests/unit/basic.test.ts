import { jest } from '@jest/globals';

describe('Basic Test Setup', () => {
  test('should work with basic assertions', () => {
    expect(1 + 1).toBe(2);
    expect('hello').toBe('hello');
  });

  test('should work with async functions', async () => {
    const result = await Promise.resolve('async result');
    expect(result).toBe('async result');
  });

  test('should work with mocks', () => {
    const mockFn = jest.fn().mockReturnValue('mocked');
    expect(mockFn()).toBe('mocked');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
}); 