import { UserViewModel } from '@modules/user/shared/view-models/user-view-model';
import { Controller, Get } from '@nestjs/common';
import { UserGetAllService } from '../service/user_getall.service';

@Controller('user')
export class UserGetAllController {
  constructor(private readonly userGetAllService: UserGetAllService) {}

  @Get()
  async get() {
    const result = await this.userGetAllService.execute();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return result.map(UserViewModel.toHttp);
  }
}
