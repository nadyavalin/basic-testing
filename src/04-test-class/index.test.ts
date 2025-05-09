import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    const balance = account.getBalance();

    expect(balance).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 50;
    const largeAmount = 100;
    const account = getBankAccount(initialBalance);

    expect(() => account.withdraw(largeAmount)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(largeAmount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance1 = 50;
    const initialBalance2 = 0;
    const largeAmount = 100;
    const account1 = getBankAccount(initialBalance1);
    const account2 = getBankAccount(initialBalance2);

    expect(() => account1.transfer(largeAmount, account2)).toThrow(
      InsufficientFundsError,
    );
    expect(() => account1.transfer(largeAmount, account2)).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance1}`,
    );
    expect(account1.getBalance()).toBe(initialBalance1);
    expect(account2.getBalance()).toBe(initialBalance2);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const transferAmount = 50;
    const account = getBankAccount(initialBalance);

    expect(() => account.transfer(transferAmount, account)).toThrow(
      TransferFailedError,
    );
    expect(() => account.transfer(transferAmount, account)).toThrow(
      'Transfer failed',
    );
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const depositAmount = 50;
    const account = getBankAccount(initialBalance);
    const result = account.deposit(depositAmount);

    expect(result).toBe(account);
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const withdrawAmount = 50;
    const account = getBankAccount(initialBalance);
    const result = account.withdraw(withdrawAmount);

    expect(result).toBe(account);
    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const initialBalance1 = 100;
    const initialBalance2 = 50;
    const transferAmount = 30;
    const account1 = getBankAccount(initialBalance1);
    const account2 = getBankAccount(initialBalance2);
    const result = account1.transfer(transferAmount, account2);

    expect(result).toBe(account1);
    expect(account1.getBalance()).toBe(initialBalance1 - transferAmount);
    expect(account2.getBalance()).toBe(initialBalance2 + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 100;
    const mockBalance = 75;
    const account = getBankAccount(initialBalance);
    (random as jest.Mock)
      .mockReturnValueOnce(mockBalance)
      .mockReturnValueOnce(1);
    const balance = await account.fetchBalance();
    expect(balance).toBe(mockBalance);
    expect(random).toHaveBeenCalledWith(0, 100, false);
    expect(random).toHaveBeenCalledWith(0, 1, false);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 100;
    const mockBalance = 75;
    const account = getBankAccount(initialBalance);
    (random as jest.Mock)
      .mockReturnValueOnce(mockBalance)
      .mockReturnValueOnce(1);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(mockBalance);
    expect(random).toHaveBeenCalledWith(0, 100, false);
    expect(random).toHaveBeenCalledWith(0, 1, false);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 100;
    const mockBalance = 0;
    const account = getBankAccount(initialBalance);
    (random as jest.Mock)
      .mockReturnValueOnce(mockBalance)
      .mockReturnValueOnce(0);

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
    expect(account.getBalance()).toBe(initialBalance);
    expect(random).toHaveBeenCalledWith(0, 100, false);
    expect(random).toHaveBeenCalledWith(0, 1, false);
  });
});
