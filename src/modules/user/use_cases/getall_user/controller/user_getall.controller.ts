import { UserViewModel } from '@modules/user/shared/view-models/user-view-model';
import { Controller, Get, Param } from '@nestjs/common';
import { UserGetAllService } from '../service/user_getall.service';

@Controller('user')
export class UserGetAllController {
  constructor(private readonly userGetAllService: UserGetAllService) {}

  @Get(':barbershop_id')
  async get(@Param() barbershop_id: string) {
    const result = await this.userGetAllService.execute(barbershop_id);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return result.map(UserViewModel.toHttp);
  }
}
