import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepo.create(createUserDto);
  }

  findById(id: string) {
    return this.usersRepo.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepo.update(id, updateUserDto);
  }
}
