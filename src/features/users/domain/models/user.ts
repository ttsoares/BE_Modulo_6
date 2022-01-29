import { MessageEntity } from "../../../../core/infra/data/database/entities/MessageEntitie";

export interface User {
  uid: string;
  name: string;
  password: string;
}
