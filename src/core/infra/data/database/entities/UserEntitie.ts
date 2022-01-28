import { BaseEntity, Column, PrimaryGeneratedColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";

import { MessageEntity } from "./MessageEntitie";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
    uid?: number;

  @Column()
    name: string;

  @Column()
    password: string;

  @OneToMany(() => MessageEntity, message => message.user, {onDelete:"CASCADE"})
    message!: MessageEntity[];

  constructor( name: string, password: string ) {
    super();
    this.name = name;
    this.password = password;
  }
}
