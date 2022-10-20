import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  return passwordHash;
};
