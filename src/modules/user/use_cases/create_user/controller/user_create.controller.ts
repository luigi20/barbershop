import { UserViewModel } from '@modules/user/shared/view-models/user-view-model';
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserCreateService } from '../service/user_create.service';

@Controller('user')
export class UserCreateController {
  constructor(private readonly userCreateService: UserCreateService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userCreateService.execute({
      email: createUserDto.email,
      name: createUserDto.name,
      password: createUserDto.password,
      role: createUserDto.role,
    });
    return UserViewModel.toHttp(result);
  }
}
