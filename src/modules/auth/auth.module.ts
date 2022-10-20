import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UsersRepository } from '../users/repositories/users.repository';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './auth.constants';
import { AuthService } from './auth.service';
import { CaslModule } from './casl/casl.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    CaslModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiration },
    }),
  ],
  providers: [
    AuthService,
    UsersRepository,
    LocalStrategy,
    JwtStrategy,
    PrismaService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
