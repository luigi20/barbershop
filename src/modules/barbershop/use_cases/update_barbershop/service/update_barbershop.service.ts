import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';
import { Barbershop } from '@modules/barbershop/shared/entities/barbershop.entity';
import { Open_Hours } from '@modules/open_hours/shared/entities/open_hours.entity';
import { CreateOpenHoursDTO } from '@modules/open_hours/shared/dto/createOpenHoursDTO';
import { IOpenHoursRepository } from '@modules/open_hours/shared/repositories/abstract_class/IOpenHoursRepository';

interface IBarbershopUpdateRequest {
  id: string;
  name: string;
  user_id: string;
  street: string;
  number: string;
  city: string;
  list_open_hours: CreateOpenHoursDTO[];
  status: string;
  phone?: string;
}
@Injectable()
export class BarbershopUpdateService {
  constructor(
    private readonly barbershopRepository: IBarbershopRepository,
    private readonly userRepository: IUserRepository,
    private readonly openHoursRepository: IOpenHoursRepository,
  ) {}
  public async execute({
    id,
    user_id,
    name,
    street,
    number,
    phone,
    city,
    list_open_hours,
    status,
  }: IBarbershopUpdateRequest): Promise<Barbershop> {
    const user_exists = await this.userRepository.findById(user_id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    const barbershop_exists = await this.barbershopRepository.findById(id);
    if (!barbershop_exists) throw new AppError('Barbearia não existe', 404);
    if (user_exists.role.toLowerCase() !== 'admin')
      throw new AppError('Usuário não pode cadastrar barbearia');
    if (user_exists.id !== barbershop_exists.owner_id)
      throw new AppError('Somente o proprietário pode alterar informações');
    const barbershop = new Barbershop(
      {
        owner_id: user_id,
        street: street,
        number: number,
        phone: phone,
        name: name,
        city: city,
        status: status,
      },
      barbershop_exists.id,
    );
    await this.barbershopRepository.update(barbershop);
    const list_create_open_hours: Open_Hours[] = [];
    for (let i = 0; i < list_open_hours.length; i++) {
      const open_hours = new Open_Hours({
        barbershop_id: barbershop.id,
        close_time: list_open_hours[i].close_time,
        day_week: list_open_hours[i].day_week,
        open_time: list_open_hours[i].open_time,
      });
      list_create_open_hours.push(open_hours);
    }
    await this.openHoursRepository.deleteMany(barbershop.id);
    await this.openHoursRepository.createMany(list_create_open_hours);
    barbershop.owner_name = user_exists.name;
    return barbershop;
  }
}
