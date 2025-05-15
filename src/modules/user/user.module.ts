import { Module } from '@nestjs/common';
import { IUserRepository } from './shared/repositories/abstract_class/IUserRepository';
import { UserRepository } from './shared/repositories/UserRepository';
import { UserController } from './use_cases/create_user/controller/user_create.controller';
import { UserService } from './use_cases/create_user/service/user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
