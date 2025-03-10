import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import {
  CreateUserDto,
  Message,
  PaginationDto,
  UpdateUserDto,
  User,
  UserList,
} from '@app/common';
import { Observable, Subject } from 'rxjs';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService implements OnModuleInit {
  private users: User[] = [];

  onModuleInit() {
    for (let i = 0; i <= 1000; i++) {
      this.create({
        username: randomUUID(),
        password: randomUUID(),
        age: 25,
      });
    }
  }
  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      ...createUserDto,
      id: randomUUID(),
      socialMedia: {},
      subscribed: false,
    };

    this.users.push(newUser);

    return newUser;
  }

  findAll() {
    return { users: this.users };
  }

  findOne(id: string): User {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException('User does not exist.');
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const index = this.users.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updateUserDto };
      return this.users[index];
    }

    throw new NotFoundException('User does not exist.');
  }

  remove(id: string): Message {
    const index = this.users.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.users = this.users.filter((item) => item.id !== id);
    }

    return { message: 'User is removed successfully.' };
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<UserList> {
    const subject = new Subject<UserList>();

    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        users: this.users.slice(start, start + paginationDto.skip),
      });
    };

    const onComplete = () => subject.complete();
    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}
