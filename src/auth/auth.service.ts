import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { RegUserDTO } from '../lib/dto/regUserDTO';
import { LoginDTO } from '../lib/dto/loginDTO';
import { Repository } from 'typeorm';
import { PositionEnum, User } from '../lib/entities/userEntity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { Payload } from 'nats';

export interface JWTpayload {
  id: number,
  position: PositionEnum
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>,
    private jwtService: JwtService
  ) {}


  async regUser(body: RegUserDTO) {
    await this.findUserByEmail(body.email, 'Found')
    const newUser = new User()
    newUser.name = body.name
    newUser.email = body.email
    const hashedPassword = await bcrypt.hash(body.password, 4)
    newUser.password = hashedPassword
    newUser.position = body.position
    const savedUser = await this.UserRepository.save(newUser)
    return this.generateToken(savedUser.id, savedUser.position)
  }
  

  async login(body: LoginDTO) {
    const foundUser = await this.findUserByEmail(body.email, 'NotFound')
    const correctPwd = await bcrypt.compare(body.password, foundUser.password)
    if (!correctPwd) {
      throw new ForbiddenException({message: 'Incorrect password'})
    }
    return this.generateToken(foundUser.id, foundUser.position)
  }


  private async findUserByEmail(email: string, errorCondition: 'Found' | 'NotFound') {
    const foundUser = await this.UserRepository.findOneBy({email})
    if (foundUser && errorCondition === 'Found') {
      throw new BadRequestException({message: `User with email ${email} already exists`})
    }
    if (!foundUser && errorCondition === 'NotFound') {
      throw new NotFoundException({message: `User with email ${email} not found`})
    }
    return foundUser
  }


  private async generateToken(id: number, position: PositionEnum) {
    const payload: JWTpayload = {
      id,
      position
    } 
    return this.jwtService.sign(payload)
  }
}
