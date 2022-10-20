import { BadRequestException, HttpStatus } from '@nestjs/common';
import { UserProps } from '../../users/repositories/users.repository';

const BadRequestAccountProps = {
  code: 'BAD_REQUEST',
  message: 'Account does not exists',
  status: HttpStatus.BAD_REQUEST,
};

export const findAccount = (user: UserProps, transaction: any) => {
  const accountOption = transaction.choose_account.toLowerCase().trim();
  const account = user.accounts.find(
    ({ account_name }) => account_name.toLowerCase() === accountOption,
  );

  if (!account) throw new BadRequestException(BadRequestAccountProps);

  return account;
};
