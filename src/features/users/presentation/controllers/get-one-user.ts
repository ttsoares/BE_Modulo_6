import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { UserRepository } from "../../infra/repositories/user.repository"

import { serverError, sucess, badRequest, notFound }
from "../../../../core/presentation/helpers/helpers";

import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";

export class GetOneUserController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
			const user_id = String(req.params.userid)

			const cache = new CacheRepository();
			const userCache = await cache.get(`user:${user_id}`);

			if (userCache) {
				return sucess(res, Object.assign({}, userCache, { _cache: true }));
			}

		const repository = new UserRepository();
    const findUser  = await repository.findById(user_id);

		if (!findUser) return notFound(res, "Usuário não encontrado");

		await cache.set(`user:${findUser.uid}`, findUser);

    return sucess(res, findUser);

	} catch (err:any) {
			return serverError(res, err);
		}
	}
}
