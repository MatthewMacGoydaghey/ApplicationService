import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./userEntity";
import { StatusEnum } from "../misc/types";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class Request {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column({nullable: false,
  type: "enum",
  enum: ["Active", "Resolved"]},)
  status: StatusEnum

  @ApiProperty()
  @Column({nullable: false})
  message: string

  @ApiProperty()
  @Column({nullable: true})
  comment: string

  @ManyToOne(() => User)
  @JoinColumn()
  requester: User

  @ManyToOne(() => User)
  @JoinColumn()
  processor: User

  @ApiProperty()
  @CreateDateColumn()
  created_at: string

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: string
}