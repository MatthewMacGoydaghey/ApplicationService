import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator'

export type StatusEnum = "Active" | "Resolved"

export class RequestDTO {
  @IsString()
  message: string
}