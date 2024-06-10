import { IsEmail, IsEnum, IsString } from "class-validator";
import { PositionEnum } from "../misc/types";
import { ApiProperty } from "@nestjs/swagger";

export class RegUserDTO {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  password: string

  @ApiProperty()
  @IsEnum(['Processor', 'Requester'])
  position: PositionEnum

}