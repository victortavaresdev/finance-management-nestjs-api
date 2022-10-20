import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  account_name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  account_number: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  account_currency: string;

  @IsNotEmpty()
  @IsString()
  account_type: string;

  @IsNotEmpty()
  @IsString()
  bank_name: string;

  @IsNotEmpty()
  @IsNumber()
  bank_balance: number;
}
