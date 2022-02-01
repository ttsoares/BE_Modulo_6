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

      // Neste ponto ainda não tenho o user_id para buscar no chache.
      // Teria que consultar o DB para obtêr isto.
      // Assim, melhor já buscar pelo nome.

      const repository = new UserRepository();
      const userExists = await repository.findByName(name);

      if (!userExists) return badRequest(res, "Usuário não encontrado");

      if (userExists.password !== password) return badRequest(res,"Senha errada");

      const cache = new CacheRepository();
      await cache.set(`thomas:user:${userExists.uid}`, userExists);

      return sucess(res, `${userExists.uid}`);

    } catch (err:any) {
  			return serverError(res, err);
  		}
  }
}
