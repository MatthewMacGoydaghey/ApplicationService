import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegUserDTO } from '../lib/dto/regUserDTO';
import { LoginDTO } from '../lib/dto/loginDTO';

@Controller('auth')
export class AuthController {
  constructor(
    private AuthService: AuthService
  ) {}

  @Post()
  regUser(@Body() body: RegUserDTO) {
 return this.AuthService.regUser(body)
  }


  @Get()
  login(@Body() body: LoginDTO) {
 return this.AuthService.login(body)
  }
}

