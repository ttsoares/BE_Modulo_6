import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { UserRepository } from "../../infra/repositories/user.repository"

import { serverError, sucess, badRequest, notFound }
from "../../../../core/presentation/helpers/helpers";

import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";

export class DeleteUserController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
		const user_id = String(req.params.userid);

		const cache = new CacheRepository();
		const repository = new UserRepository();
    const removedUser = await repository.delete(user_id);

		if (!removedUser) return badRequest(res, "usuário não foi removido");

		await cache.delete(`user:${removedUser.uid}`);
		await cache.delete("messages")

		return sucess(res, removedUser);

	} catch (err:any) {
			return serverError(res, err);
		}
	}
}
