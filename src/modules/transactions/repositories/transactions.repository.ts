import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AccountsRepository } from 'src/modules/accounts/repositories/accounts.repository';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionEntity } from '../entities/transaction.entity';
import { findAccount } from '../utils/findAccount.utils';
import {
  createAccountBalanceTransaction,
  deleteAccountBalanceTransaction,
} from '../utils/updateBankBalance.utils';

@Injectable()
export class TransactionsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersRepo: UsersRepository,
    private readonly accountsRepo: AccountsRepository,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
    user: any,
  ): Promise<TransactionEntity> {
    const userData = await this.usersRepo.findById(user.id);
    const account = findAccount(userData, createTransactionDto);

    const accountData = await this.accountsRepo.findById(account.id);
    const newBalance = createAccountBalanceTransaction(
      accountData,
      createTransactionDto,
    );
    await this.accountsRepo.update(account.id, { bank_balance: newBalance });

    const transaction = {
      ...createTransactionDto,
      user_id: user.id,
      account_id: account.id,
    };

    return this.prisma.transaction.create({ data: transaction });
  }

  async findById(id: string): Promise<TransactionEntity> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    if (!transaction) throw new NotFoundError('Resource not found');

    return transaction;
  }

  async remove(id: string): Promise<TransactionEntity> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    if (!transaction) throw new NotFoundError('Resource not found');

    const accountData = await this.accountsRepo.findById(
      transaction.account_id,
    );

    const newBalance = deleteAccountBalanceTransaction(
      transaction,
      accountData,
    );

    await this.accountsRepo.update(transaction.account_id, {
      bank_balance: newBalance,
    });

    return this.prisma.transaction.delete({ where: { id } });
  }
}
