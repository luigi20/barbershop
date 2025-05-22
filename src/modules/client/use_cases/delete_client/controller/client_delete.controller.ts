import { Controller, Param, Delete } from '@nestjs/common';
import { ClientDeleteService } from '../service/client_delete.service';

@Controller('client')
export class ClientDeleteController {
  constructor(private readonly clientDeleteService: ClientDeleteService) {}

  @Delete(':id')
  async delete(@Param() id: string) {
    await this.clientDeleteService.execute(id);
  }
}
