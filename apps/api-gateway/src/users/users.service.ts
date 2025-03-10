import {
  CreateUserDto,
  PaginationDto,
  UpdateUserDto,
  USERS_SERVICE_NAME,
  UsersServiceClient,
} from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AUTH_SERVICE } from './constants';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UsersServiceClient;

  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  create(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  findAll() {
    return this.usersService.findAllUsers({});
  }

  findOne(id: string) {
    return this.usersService.findOneUser({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser({ ...updateUserDto });
  }

  remove(id: string) {
    return this.usersService.removeUser({ id });
  }

  emailUsers() {
    const users$ = new ReplaySubject<PaginationDto>();

    users$.next({ page: 0, skip: 2 });
    users$.next({ page: 1, skip: 2 });
    // users$.next({ page: 2, skip: 2 });
    // users$.next({ page: 3, skip: 2 });
    // users$.next({ page: 4, skip: 2 });

    users$.complete();

    let chunkNumber = 1;

    return this.usersService.queryUsers(users$).subscribe((users) => {
      console.log('Chunk', chunkNumber, users);
      chunkNumber++;
    });
  }
}
