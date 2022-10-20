import { BadRequestException, HttpStatus } from '@nestjs/common';
import { AccountEntity } from 'src/modules/accounts/entities/account.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionEntity } from '../entities/transaction.entity';

const BadRequestProps = {
  code: 'BAD_REQUEST',
  status: HttpStatus.BAD_REQUEST,
};

export const createAccountBalanceTransaction = (
  account: AccountEntity,
  transaction: CreateTransactionDto,
): number => {
  const type = transaction.type.toLowerCase().trim();
  const accountBalance = account.bank_balance;
  const transactionValue = transaction.value;

  const isAccBalance = accountBalance >= transactionValue;
  const accMinusTransaction = accountBalance - transactionValue;
  const accPlusTransaction = accountBalance + transactionValue;

  if (type === 'despesa' && isAccBalance) return accMinusTransaction;
  else if (type === 'renda') return accPlusTransaction;
  else
    throw new BadRequestException({
      ...BadRequestProps,
      message: 'Insufficient bank balance',
    });
};

export const deleteAccountBalanceTransaction = (
  transaction: TransactionEntity,
  account: AccountEntity,
): number => {
  const type = transaction.type;
  const accountBalance = account.bank_balance;
  const transactionValue = transaction.value;

  const isAccBalance = accountBalance >= transactionValue;
  const accMinusTransaction = accountBalance - transactionValue;
  const accPlusTransaction = accountBalance + transactionValue;

  if (type === 'renda' && isAccBalance) return accMinusTransaction;
  else if (type === 'despesa') return accPlusTransaction;
  else
    throw new BadRequestException({
      ...BadRequestProps,
      message: 'Error deleting transaction',
    });
};
