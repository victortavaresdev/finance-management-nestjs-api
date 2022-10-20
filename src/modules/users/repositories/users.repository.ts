import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { ConflictError } from 'src/common/errors/types/ConflictError';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { hashPassword } from '../utils/hashPassword.utils';

export interface UserProps {
  id: string;
  name: string;
  email: string;
  accounts: Account[];
}

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userEmail = await this.findByEmail(createUserDto.email);
    if (userEmail) throw new ConflictError('Email already exists');

    const passwordHash = await hashPassword(createUserDto.password);
    const user = {
      ...createUserDto,
      password: passwordHash,
    };

    return this.prisma.user.create({ data: user });
  }

  async findById(id: string): Promise<UserProps> {
    const userId = await this.prisma.user.findUnique({
      where: { id },
      include: { accounts: true },
    });
    if (!userId) throw new NotFoundError('Resource not found');

    const { password, createdAt, updatedAt, ...data } = userId;
    return data;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const userId = await this.prisma.user.findUnique({ where: { id } });
    if (!userId) throw new NotFoundError('Resource not found');

    const passwordHash = await hashPassword(updateUserDto.password);
    const user = {
      ...updateUserDto,
      password: passwordHash,
    };

    return this.prisma.user.update({
      where: { id },
      data: user,
    });
  }
}
