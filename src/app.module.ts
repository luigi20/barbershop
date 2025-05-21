import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './infra/redis/redis.module';
import { UserModule } from '@modules/user/user.module';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { BarbershopModule } from '@modules/barbershop/barbershop.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UserModule,
    RedisModule,
    PrismaModule,
    BarbershopModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
