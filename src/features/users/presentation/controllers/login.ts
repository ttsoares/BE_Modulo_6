import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { UserRepository } from "../../infra/repositories/user.repository";

import { serverError, sucess, badRequest, notFound }
from "../../../../core/presentation/helpers/helpers";

import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";

export class LoginUserController implements Controller{
  async handle(req: Request, res: Response): Promise<any> {
		try {
      const { name, password } = req.body;

      const repository = new UserRepository();
      const userExists = await repository.findByName(name);

      if (!userExists) return badRequest(res, "Usuário não encontrado");

      if (userExists.password !== password) return badRequest(res,"Senha errada");

<<<<<<< HEAD
      // No cache a busca não é feita por user_ui, é uma busca cega.
      // Então cada vez que um usuário loga tem que limpar o Cache.
      // Se não fizer isso as mensagens que virão serão as no Cache
      //  e não as mensagens daquele usuário que acabou de logar.

      const cache = new CacheRepository();
      await cache.delete("messages");

=======
>>>>>>> e12d27432b2e8278ad14c4297db30ee55a71a84e
      return sucess(res, `${userExists.uid}`);

    } catch (err:any) {
  			return serverError(res, err);
  		}
  }
}
