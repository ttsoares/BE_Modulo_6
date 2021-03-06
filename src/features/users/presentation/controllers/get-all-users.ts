import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { serverError, notFound } from "../../../../core/presentation/helpers/helpers";
import { UserRepository } from "../../infra/repositories/user.repository"

import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";

export class GetAllUsersController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
			const cache = new CacheRepository();
			const usersCache = await cache.get("thomas:users");

			if (usersCache) {
				console.log("Lista de usuarios vem do cache")
        return res.status(200).render('users', {data:usersCache});
      }

			const repository = new UserRepository();
			const allUsers = await repository.getAllUsers()

			if (!allUsers.length) return notFound(res);

			await cache.set("thomas:users", allUsers);

			console.log("Lista de usuarios NÃO vem do cache")
			return res.status(200).render('users', {data:allUsers});

	} catch (err:any) {
			return serverError(res, err);
		}
	}
}
