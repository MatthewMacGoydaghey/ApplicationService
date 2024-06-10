import { IsEnum } from "class-validator";
import { StatusEnum } from "../misc/types";
import { ApiProperty } from "@nestjs/swagger";

export class StatusQueryDTO {
  @ApiProperty()
  @IsEnum(['Active', 'Resolve'])
  status: StatusEnum

}