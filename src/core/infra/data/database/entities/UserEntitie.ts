import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";

import { v4 as uuid } from "uuid";
import { MessageEntity } from "./MessageEntitie";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
    uid!: string;

  @Column()
    name!: string;

  @Column()
    password!: string;

  @Column({ name: "created_at" })
    createdAt!: Date;

  @Column({ name: "updated_at" })
    updatedAt!: Date;
    
  @OneToMany(() => MessageEntity, message => message.user, {cascade: true})
  message!: MessageEntity[];


  @BeforeInsert()
  private beforeInsert(){
    this.uid = uuid();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  private beforeUpdate() {
    this.updatedAt = new Date();
  }

  constructor( name: string, password: string ) {
    super();
    this.name = name;
    this.password = password;
  }
}
