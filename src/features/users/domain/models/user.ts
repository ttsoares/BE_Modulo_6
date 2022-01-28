import { MessageEntity } from "../../../../core/infra/data/database/entities/MessageEntitie";

export interface User {
  uid: number;
  name: string;
  password: string;
  messages?: Array<MessageEntity>;
}
