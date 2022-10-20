import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
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
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionsRepository } from './repositories/transactions.repository';
import { TransactionsService } from './transactions.service';

const apiBodyTransaction = {
  type: 'renda',
  value: 3000,
  date: '20/10/2022',
  description: 'Recebimento do salário',
  choose_account: 'Conta da Caixa',
};

@ApiTags('Transactions')
@UseGuards(JwtAuthGuard)
@Controller('api/v1/transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly transactionsRepo: TransactionsRepository,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create transaction' })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    schema: {
      example: apiBodyTransaction,
    },
  })
  @Post('create')
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() { user }: Request,
  ) {
    return this.transactionsService.create(createTransactionDto, user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get transaction by Id' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get(':id')
  async findById(@Param('id') id: string, @Req() { user }: any) {
    const { user_id } = await this.transactionsRepo.findById(id);
    checkAuthorization(user, user_id, Action.Read, TransactionEntity);
    return this.transactionsService.findById(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete transaction by Id' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() { user }: any) {
    const { user_id } = await this.transactionsRepo.findById(id);
    checkAuthorization(user, user_id, Action.Delete, TransactionEntity);
    return this.transactionsService.remove(id);
  }
}
