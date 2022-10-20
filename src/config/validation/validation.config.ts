import { INestApplication, ValidationPipe } from '@nestjs/common';

export const validationConfig = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
};
