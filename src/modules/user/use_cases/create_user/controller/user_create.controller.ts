import { UserViewModel } from '@modules/user/shared/view-models/user-view-model';
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserCreateServiceService } from '../service/user_create.service';

@Controller('user')
export class UserController {
  constructor(private readonly userCreateService: UserCreateServiceService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userCreateService.execute(createUserDto);
    return UserViewModel.toHttp(result);
  }
}
