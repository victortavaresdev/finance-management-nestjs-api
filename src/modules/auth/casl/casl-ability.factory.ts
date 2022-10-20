import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AccountEntity } from 'src/modules/accounts/entities/account.entity';
import { TransactionEntity } from 'src/modules/transactions/entities/transaction.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export enum Action {
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects =
  | InferSubjects<
      typeof UserEntity | typeof AccountEntity | typeof TransactionEntity
    >
  | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  defineAbility(authenticatedUser: User, id: string) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (authenticatedUser.id === id) {
      can(Action.Read, UserEntity);
      can(Action.Update, UserEntity);
      can(Action.Read, AccountEntity);
      can(Action.Update, AccountEntity);
      can(Action.Delete, AccountEntity);
      can(Action.Read, TransactionEntity);
      can(Action.Delete, TransactionEntity);
    } else {
      cannot(Action.Read, UserEntity);
      cannot(Action.Update, UserEntity);
      cannot(Action.Read, AccountEntity);
      cannot(Action.Update, AccountEntity);
      cannot(Action.Delete, AccountEntity);
      cannot(Action.Read, TransactionEntity);
      cannot(Action.Delete, TransactionEntity);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
