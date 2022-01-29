import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { UserRepository } from "../../infra/repositories/user.repository";

import { serverError, sucess, badRequest, notFound }
from "../../../../core/presentation/helpers/helpers";

export class LoginUserController implements Controller{
  async handle(req: Request, res: Response): Promise<any> {
		try {

      const repository = new UserRepository();
      const { name, password } = req.body;
      const userExists = await repository.findByName(name);

      if (!userExists) return badRequest(res, "Usuário não encontrado");

      if (userExists.password !== password) return badRequest(res,"Senha errada");

      return sucess(res, `${userExists.uid}`);

    } catch (err:any) {
  			return serverError(res, err);
  		}
  }
}
