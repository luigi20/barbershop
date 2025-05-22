import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/shared/repositories/abstract_class/IUserRepository';
import { AppError } from '@utils/apperror';
import { IBarbershopRepository } from '@modules/barbershop/shared/repositories/abstract_class/IBarbershopRepository';
import { Barbershop } from '@modules/barbershop/shared/entities/barbershop.entity';
import { IMemberRepository } from '@modules/member/shared/repositories/abstract_class/IMemberRepository';
import { Member } from '@modules/member/shared/entities/member.entity';
import { IOpenHoursRepository } from '@modules/open_hours/shared/repositories/abstract_class/IOpenHoursRepository';
import { Open_Hours } from '@modules/open_hours/shared/entities/open_hours.entity';
import { CreateOpenHoursDTO } from '@modules/open_hours/shared/dto/createOpenHoursDTO';

interface IBarbershopCreateRequest {
  name: string;
  owner_id: string;
  street: string;
  number: string;
  city: string;
  list_open_hours: CreateOpenHoursDTO[];
  phone?: string;
}
@Injectable()
export class BarbershopCreateService {
  constructor(
    private readonly barbershopRepository: IBarbershopRepository,
    private readonly userRepository: IUserRepository,
    private readonly memberRepository: IMemberRepository,
    private readonly openHoursRepository: IOpenHoursRepository,
  ) {}
  public async execute({
    owner_id,
    name,
    street,
    number,
    phone,
    city,
    list_open_hours,
  }: IBarbershopCreateRequest): Promise<Barbershop> {
    const user_exists = await this.userRepository.findById(owner_id);
    if (!user_exists) throw new AppError('Usuário não existe', 404);
    // depois ver se o usuário é admin
    const barbershop = new Barbershop({
      owner_id: owner_id,
      street: street,
      number: number,
      phone: phone,
      name: name,
      city: city,
      status: 'FECHADA',
    });
    await this.barbershopRepository.create(barbershop);
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
    await this.openHoursRepository.createMany(list_create_open_hours);
    barbershop.owner_name = user_exists.name;
    const member = new Member({
      barbershop_id: barbershop.id,
      role: 'ADMIN',
      user_id: user_exists.id,
    });
    await this.memberRepository.create(member);
    return barbershop;
  }
}
