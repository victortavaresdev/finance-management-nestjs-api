import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AccountsRepository } from '../accounts/repositories/accounts.repository';
import { CaslModule } from '../auth/casl/casl.module';
import { UsersRepository } from '../users/repositories/users.repository';
import { TransactionsRepository } from './repositories/transactions.repository';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [CaslModule],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionsRepository,
    UsersRepository,
    AccountsRepository,
    PrismaService,
  ],
})
export class TransactionsModule {}
