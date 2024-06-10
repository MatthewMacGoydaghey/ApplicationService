import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegUserDTO } from '../lib/dto/regUserDTO';
import { LoginDTO } from '../lib/dto/loginDTO';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../lib/entities/userEntity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private AuthService: AuthService
  ) {}

  @ApiOperation({summary: "Создаёт пользователя"})
  @ApiResponse({status: 201, type: User})
  @Post()
  regUser(@Body() body: RegUserDTO) {
 return this.AuthService.regUser(body)
  }


  @ApiOperation({summary: "Возвращает JWT токен"})
  @ApiResponse({status: 200})
  @Get()
  login(@Body() body: LoginDTO) {
 return this.AuthService.login(body)
  }
}

