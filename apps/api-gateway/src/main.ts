import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import * as path from 'path';

async function bootstrap() {

  const commonPath = path.join(process.cwd(), './libs/common');
  require.main.paths.unshift(commonPath);
  
  const app = await NestFactory.create(ApiGatewayModule);
  await app.listen(process.env.port ?? 3000);

  
}
bootstrap();
