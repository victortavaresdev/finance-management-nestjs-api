import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountsRepository } from './repositories/accounts.repository';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepo: AccountsRepository) {}

  create(createAccountDto: CreateAccountDto, user: any) {
    return this.accountsRepo.create(createAccountDto, user);
  }

  findById(id: string) {
    return this.accountsRepo.findById(id);
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    return this.accountsRepo.update(id, updateAccountDto);
  }

  remove(id: string) {
    return this.accountsRepo.remove(id);
  }
}
