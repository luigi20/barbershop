import { UserViewModel } from '@modules/user/shared/view-models/user-view-model';
import { Controller, Get, Param } from '@nestjs/common';
import { UserGetService } from '../service/user_get.service';

@Controller('user')
export class UserGetController {
  constructor(private readonly userGetService: UserGetService) {}

  @Get(':id')
  async get(@Param() id: string) {
    const result = await this.userGetService.execute(id);
    return UserViewModel.toHttp(result);
  }
}
