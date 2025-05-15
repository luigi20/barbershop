import { Module } from '@nestjs/common';
import { IUserRepository } from './shared/repositories/abstract_class/IUserRepository';
import { UserRepository } from './shared/repositories/UserRepository';
import { UserUpdateController } from './use_cases/update_user/controller/user_update.controller';
import { UserUpdateService } from './use_cases/update_user/service/user_update.service';
import { UserCreateController } from './use_cases/create_user/controller/user_create.controller';
import { UserCreateService } from './use_cases/create_user/service/user_create.service';
import { UserDeleteController } from './use_cases/delete_user/controller/user_delete.controller';
import { UserDeleteService } from './use_cases/delete_user/service/user_delete.service';
import { UserGetAllController } from './use_cases/getall_user/controller/user_getall.controller';
import { UserGetAllService } from './use_cases/getall_user/service/user_getall.service';

@Module({
  controllers: [
    UserCreateController,
    UserUpdateController,
    UserDeleteController,
    UserGetAllController,
  ],
  providers: [
    UserCreateService,
    UserUpdateService,
    UserDeleteService,
    UserGetAllService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
