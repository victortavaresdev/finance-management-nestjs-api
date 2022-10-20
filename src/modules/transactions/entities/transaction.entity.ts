import { Transaction } from '@prisma/client';

export class TransactionEntity implements Transaction {
  id: string;
  type: string;
  value: number;
  date: string;
  description: string;
  choose_account: string;
  user_id: string;
  account_id: string;
  createdAt: Date;
  updatedAt: Date;
}
