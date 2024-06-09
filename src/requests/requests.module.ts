import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from '../lib/entities/requestEntity';
import { User } from '../lib/entities/userEntity';

@Module({
  imports: [TypeOrmModule.forFeature([Request, User])],
  controllers: [RequestsController],
  providers: [RequestsService]
})
export class RequestsModule {}
