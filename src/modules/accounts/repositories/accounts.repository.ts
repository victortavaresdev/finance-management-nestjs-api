import { Injectable } from '@nestjs/common';
import { ConflictError } from 'src/common/errors/types/ConflictError';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { AccountEntity } from '../entities/account.entity';

@Injectable()
export class AccountsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createAccountDto: CreateAccountDto,
    user: any,
  ): Promise<AccountEntity> {
    const userId = user.id;
    const accountNumber = await this.findByAccountNumber(
      createAccountDto.account_number,
    );
    if (accountNumber) throw new ConflictError('Account number alreary exists');

    const data = {
      ...createAccountDto,
      user_id: userId,
    };

    return this.prisma.account.create({ data });
  }

  async findById(id: string): Promise<AccountEntity> {
    const account = await this.prisma.account.findUnique({
      where: { id },
    });
    if (!account) throw new NotFoundError('Resource not found');

    return account;
  }

  async findByAccountNumber(accountNumber: string): Promise<AccountEntity> {
    return this.prisma.account.findUnique({
      where: { account_number: accountNumber },
    });
  }

  async update(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<AccountEntity> {
    const account = await this.prisma.account.findUnique({ where: { id } });
    if (!account) throw new NotFoundError('Resource not found');

    return this.prisma.account.update({
      where: { id },
      data: updateAccountDto,
    });
  }

  async remove(id: string): Promise<AccountEntity> {
    const account = await this.prisma.account.findUnique({ where: { id } });
    if (!account) throw new NotFoundError('Resource not found');

    return this.prisma.account.delete({ where: { id } });
  }
}
