import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsRepository } from './repositories/transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionsRepo: TransactionsRepository) {}

  create(createTransactionDto: CreateTransactionDto, user: any) {
    return this.transactionsRepo.create(createTransactionDto, user);
  }

  findById(id: string) {
    return this.transactionsRepo.findById(id);
  }

  remove(id: string) {
    return this.transactionsRepo.remove(id);
  }
}
