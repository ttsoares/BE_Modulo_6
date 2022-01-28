
import { BaseEntity, Column, PrimaryGeneratedColumn, Entity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";

import { UserEntity } from "./UserEntitie"

@Entity({ name: "messages" })
export class MessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
    uid!: number;

  @Column()
    description: string;

  @Column()
    details: string;

  @Column()
    user_id: number;

  @ManyToOne(() => UserEntity, user => user.message)
  @JoinColumn({ name: "user_id", referencedColumnName: "uid" })
  user!: UserEntity;

  constructor( description: string, details: string, user_id: number ) {
    super();
    this.description = description;
    this.details = details;
    this.user_id = user_id;
  }
}
