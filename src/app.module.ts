import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Request } from './lib/entities/requestEntity';
import { RequestsModule } from './requests/requests.module';
import { User } from './lib/entities/userEntity';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Request],
    synchronize: true
  }), RequestsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
