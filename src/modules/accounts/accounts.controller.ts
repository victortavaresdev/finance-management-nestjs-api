import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { checkAuthorization } from 'src/common/utils/checkAuthorization.utils';
import { Action } from '../auth/casl/casl-ability.factory';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountEntity } from './entities/account.entity';
import { AccountsRepository } from './repositories/accounts.repository';

const apiBodyAccount = {
  account_name: 'Conta da Caixa',
  account_number: '1111333355559999',
  account_currency: 'BRL',
  account_type: 'Conta Corrente',
  bank_name: 'Caixa Econômica',
  bank_balance: 5000,
};

const apiBodyAccountUpdate = {
  account_name: 'Conta da Caixa',
  account_currency: 'BRL',
  account_type: 'Conta Corrente',
  bank_name: 'Caixa Econômica',
  bank_balance: 5000,
};

@ApiTags('Accounts')
@UseGuards(JwtAuthGuard)
@Controller('api/v1/accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly accountsRepo: AccountsRepository,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create account' })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    schema: {
      example: apiBodyAccount,
    },
  })
  @Post('create')
  create(@Body() createAccountDto: CreateAccountDto, @Req() { user }: Request) {
    return this.accountsService.create(createAccountDto, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get account by Id' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get(':id')
  async findById(@Param('id') id: string, @Req() { user }: any) {
    const { user_id } = await this.accountsRepo.findById(id);
    checkAuthorization(user, user_id, Action.Read, AccountEntity);
    return this.accountsService.findById(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update account' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    schema: {
      example: apiBodyAccountUpdate,
    },
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
    @Req() { user }: any,
  ) {
    const { user_id } = await this.accountsRepo.findById(id);
    checkAuthorization(user, user_id, Action.Update, AccountEntity);
    return this.accountsService.update(id, updateAccountDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete account by Id' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() { user }: any) {
    const { user_id } = await this.accountsRepo.findById(id);
    checkAuthorization(user, user_id, Action.Delete, AccountEntity);
    return this.accountsService.remove(id);
  }
}
