import { Account } from '@prisma/client';

export class AccountEntity implements Account {
  id: string;
  account_name: string;
  account_number: string;
  account_currency: string;
  account_type: string;
  account_active: boolean;
  bank_name: string;
  bank_balance: number;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
}
