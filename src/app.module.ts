import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './infra/redis/redis.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UserModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
