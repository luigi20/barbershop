import { UserViewModel } from '@modules/user/shared/view-models/user-view-model';
import { Controller, Body, Put, Param } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update_user.dto';
import { UserUpdateService } from '../service/user_update.service';

@Controller('user')
export class UserUpdateController {
  constructor(private readonly userUpdateService: UserUpdateService) {}

  @Put(':id')
  async update(@Param() id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.userUpdateService.execute({
      id: id,
      email: updateUserDto.email,
      name: updateUserDto.name,
      password: updateUserDto.password,
      role: updateUserDto.role,
      phone: updateUserDto.phone,
      status: updateUserDto.status,
    });
    return UserViewModel.toHttp(result);
  }
}
