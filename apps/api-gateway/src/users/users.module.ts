import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from './constants';
import { AUTH_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE, // Moved inside the client configuration object
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../../auth/auth.proto'),
          url: 'auth:5000'
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
