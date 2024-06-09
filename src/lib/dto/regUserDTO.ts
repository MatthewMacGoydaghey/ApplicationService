import { IsEmail, IsEnum, IsString } from "class-validator";
import { PositionEnum } from "../entities/userEntity";

export class RegUserDTO {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsEnum(['Processor', 'Requester'])
  position: PositionEnum

}