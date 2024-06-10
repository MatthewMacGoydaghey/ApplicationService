import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Request } from "./requestEntity";
import { PositionEnum } from "../misc/types";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column({nullable: false})
  name: string

  @ApiProperty()
  @Column({nullable: false})
  email: string

  @ApiProperty()
  @Column({nullable: false})
  password: string

  @ApiProperty()
  @Column({nullable: false,
    type: "enum",
    enum: ["Processor", "Requester"]},)
  position: PositionEnum

  @OneToMany(() => Request, (request) => request.requester) 
  sentRequests: Request[]

  @OneToMany(() => Request, (request) => request.processor) 
  receivedRequests: Request[]
}