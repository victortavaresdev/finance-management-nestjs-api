import { User } from '@prisma/client';
import { CaslAbilityFactory } from 'src/modules/auth/casl/casl-ability.factory';
import { ForbiddenError } from '../errors/types/ForbiddenError';

const casl = new CaslAbilityFactory();

export const checkAuthorization = (
  authenticatedUser: User,
  id: string,
  action: any,
  entity: any,
): boolean => {
  const ability = casl.defineAbility(authenticatedUser, id);
  const isAllowed = ability.can(action, entity);
  if (!isAllowed) throw new ForbiddenError('Forbidden access');

  return true;
};
