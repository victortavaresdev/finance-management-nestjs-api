import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CaslModule } from '../auth/casl/casl.module';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './repositories/accounts.repository';

@Module({
  imports: [CaslModule],
  controllers: [AccountsController],
  providers: [AccountsService, AccountsRepository, PrismaService],
})
export class AccountsModule {}
