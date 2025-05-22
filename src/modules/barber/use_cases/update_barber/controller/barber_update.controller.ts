import { UserViewModel } from '@modules/user/shared/view-models/user-view-model';
import { UpdateUserDto } from '@modules/user/use_cases/update_user/dto/update_user.dto';
import { Controller, Body, Put, Param } from '@nestjs/common';
import { BarberUpdateService } from '../service/barber_update.service';

@Controller('barber')
export class BarberUpdateController {
  constructor(private readonly barberUpdateService: BarberUpdateService) {}

  @Put(':id')
  async update(@Param() id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.barberUpdateService.execute({
      id: id,
      email: updateUserDto.email,
      name: updateUserDto.name,
      password: updateUserDto.password,
      role: updateUserDto.role,
      phone: updateUserDto.phone,
    });
    return UserViewModel.toHttp(result);
  }
}
