import { UserViewModel } from '@modules/user/shared/view-models/user-view-model';
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.execute(createUserDto);
    return UserViewModel.toHttp(result);
  }
}
