import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"

import { serverError, sucess, badRequest, notFound
} from "../../../../core/presentation/helpers/helpers";

import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";

import { UserRepository } from "../../infra/repositories/user.repository"

export class CreateUserController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
		const { name, password } = req.body;

		const cache = new CacheRepository();
		const repository = new UserRepository();

    const userExists = await repository.findByName(name);
		if (userExists) return badRequest(res, "Usuário já existe !");

		const user = await repository.createUser({
			name: name,
			password: password
		});

		const result = await cache.set(`user:${user.uid}`, user);
		if (!result) console.log("NÃO SALVOU NO CACHE");

		await cache.delete("users");

		return sucess(res, "Usuario criado");

	} catch (err:any) {
			return serverError(res, err);
		}
	}
}
