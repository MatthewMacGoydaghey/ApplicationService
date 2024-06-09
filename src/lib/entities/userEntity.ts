import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Request } from "./requestEntity";

export type PositionEnum = "Processor" | "Requester"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({nullable: false})
  name: string

  @Column({nullable: false})
  email: string

  @Column({nullable: false})
  password: string

  @Column({nullable: false,
    type: "enum",
    enum: ["Processor", "Requester"]},)
  position: PositionEnum

  @OneToMany(() => Request, (request) => request.requester) 
  sentRequests: Request[]

  @OneToMany(() => Request, (request) => request.processor) 
  receivedRequests: Request[]
}