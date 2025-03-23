import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import { AUTH_PACKAGE_NAME } from '@app/common';
import * as path from 'path';

async function bootstrap() {
  const logger = new Logger('AuthModule');
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        package: AUTH_PACKAGE_NAME,
        protoPath: join(__dirname, '../auth.proto'),
        url: 'auth:5000',
      },
    },
  );

  await app.listen();

  
  logger.log('Auth Module microservice created successfully.');
}
bootstrap();
