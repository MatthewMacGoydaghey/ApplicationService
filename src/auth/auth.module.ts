import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../lib/entities/userEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    global: true,
    secret: 'SECRET',
    signOptions: {
      expiresIn: '1h' 
    }
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
