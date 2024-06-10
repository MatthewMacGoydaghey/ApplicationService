import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class RequestDTO {
  @ApiProperty()
  @IsString()
  message: string
}