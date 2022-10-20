import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/repositories/users.repository';

export interface ValidateUserProps {
  id: string;
  name: string;
  email: string;
}

const BadRequestProps = {
  code: 'BAD_REQUEST',
  message: 'Invalid credentials',
  status: HttpStatus.BAD_REQUEST,
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<ValidateUserProps> {
    const user = await this.usersRepo.findByEmail(email);
    if (!user) throw new BadRequestException(BadRequestProps);

    const plainPassword = await bcrypt.compare(pass, user.password);
    if (!plainPassword) throw new BadRequestException(BadRequestProps);

    const { password, createdAt, updatedAt, ...data } = user;
    return data;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const { name, email, id } = user;

    const payload = {
      sub: id,
      name,
      email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
