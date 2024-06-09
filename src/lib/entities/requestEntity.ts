import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusEnum } from "../dto/requestDTO";
import { User } from "./userEntity";


@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number

  @Column({nullable: false,
  type: "enum",
  enum: ["Active", "Resolved"]},)
  status: StatusEnum

  @Column({nullable: false})
  message: string

  @Column({nullable: true})
  comment: string

  @ManyToOne(() => User)
  @JoinColumn()
  requester: User

  @ManyToOne(() => User)
  @JoinColumn()
  processor: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}