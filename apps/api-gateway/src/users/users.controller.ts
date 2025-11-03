import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "@app/common";
import { MetricsService } from "../metrics.service";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly metricsService: MetricsService
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    this.metricsService.incrementRequestCounter();
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    this.metricsService.incrementRequestCounter();
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    this.metricsService.incrementRequestCounter();
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    this.metricsService.incrementRequestCounter();
    return this.usersService.remove(id);
  }

  @Post("email")
  sendEmail() {
    return this.usersService.emailUsers();
  }
}
