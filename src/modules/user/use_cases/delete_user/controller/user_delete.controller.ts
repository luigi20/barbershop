import { Controller, Param, Delete } from '@nestjs/common';
import { UserDeleteService } from '../service/user_delete.service';

@Controller('user')
export class UserDeleteController {
  constructor(private readonly userDeleteService: UserDeleteService) {}

  @Delete(':id')
  async delete(@Param() id: string) {
    await this.userDeleteService.execute(id);
  }
}
