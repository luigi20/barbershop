import { UserViewModel } from '@modules/user/shared/view-models/user-view-model';
import { Controller, Body, Put, Param } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update_user.dto';
import { UserUpdateServiceService } from '../service/user_update.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userUpdateServiceService: UserUpdateServiceService,
  ) {}

  @Put(':id')
  async update(@Param() id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.userUpdateServiceService.execute({
      id: id,
      email: updateUserDto.email,
      name: updateUserDto.name,
      password: updateUserDto.password,
      role: updateUserDto.role,
    });
    return UserViewModel.toHttp(result);
  }
}
