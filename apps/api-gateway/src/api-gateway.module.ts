import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AppController } from "./app.controller";
import { MetricsService } from "./metrics.service";

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [MetricsService],
})
export class ApiGatewayModule {}
