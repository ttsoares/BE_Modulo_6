import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { UserRepository } from "../../infra/repositories/user.repository";

import { serverError, sucess, badRequest, notFound }
from "../../../../core/presentation/helpers/helpers";

import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";

export class UpdateUserController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
			const user_id = req.params.userid;
			const { name, password }: { name: string; password: string } = req.body;

			const repository = new UserRepository();

			// empty password is not allowed
			if ( password.replace(/\s+/g,'') === '') return badRequest(res, "Senha vazia !");

			const userUpdated = await repository.updateUser({name, password, uid: user_id});

			if (!userUpdated) return notFound(res, "Usuário não encontrado");

			const cache = new CacheRepository();
      await cache.delete("thomas:users");
      await cache.set(`thomas:user:${user_id}`, userUpdated);

			return sucess(res, userUpdated);

		} catch (err:any) {
			return serverError(res, err);
		};
	};
};
