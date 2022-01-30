import { MessageEntity } from
"../../../../core/infra/data/database/entities/MessageEntitie";
import { UserEntity } from
"../../../../core/infra/data/database/entities/UserEntitie";
import { User } from "../../domain/models/user";

interface UserParams {
  uid?: string;
  name: string;
  password: string;
}

export class UserRepository {
//***************************

  /////  Cria um novo usuário no DB
  async createUser(data: UserParams): Promise<User> {

    const userEntity = UserEntity.create({
      name: data.name,
      password: data.password,
    });

    await userEntity.save();

    return this.mapperFromEntityToModel(userEntity);
  }

  /////  Verifica autenticação do usuário
  async findByName(name: string): Promise<User | undefined> {

    const userEntity = await UserEntity.findOne({
      where: { name: name }
    });

    if (!userEntity) return undefined;

    return this.mapperFromEntityToModel(userEntity);
  }

  ///// Busca um usuário pelo 'uid'
  async findById(uid: string): Promise<User | undefined> {

    const userEntity = await UserEntity.findOne({
      where: { uid:uid } });

    if (!userEntity) return  undefined;

    return this.mapperFromEntityToModel(userEntity);
  }

  ///// Traz a lista de usuários
  async getAll(): Promise<User[] | undefined> {
    const userEntities = await UserEntity.find();

    if (!userEntities) return  undefined;

    return userEntities.map((userEntity) =>
      this.mapperFromEntityToModel(userEntity)
    );
  }

  ///// Remove um usuário
  async delete(uid: string): Promise<User | undefined> {

    const userEntity = await UserEntity.findOne(uid);

    if (!userEntity) return undefined;

    await userEntity.remove()

    return this.mapperFromEntityToModel(userEntity);
  }

  /////  Atualiza um usuário no DB
  async update(data: UserParams): Promise<User | undefined> {

    const updtUser = await UserEntity.findOne({
			where: {uid: data.uid}})

    if (!updtUser) return undefined;

    updtUser.name = data.name;
    updtUser.password = data.password;

    await updtUser.save();

    return this.mapperFromEntityToModel(updtUser);
  } 

  private mapperFromEntityToModel(entity: UserEntity): User {
    return {
      uid: String(entity.uid),
      name: entity.name,
      password: entity.password,
    };
  }
}
