import { IsEnum } from "class-validator";
import { StatusEnum } from "./requestDTO";

export class StatusQueryDTO {
  @IsEnum(['Active', 'Resolve'])
  status: StatusEnum

}