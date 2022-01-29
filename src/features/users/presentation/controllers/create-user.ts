import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"

import { serverError, sucess, badRequest, notFound
} from "../../../../core/presentation/helpers/helpers";

import { UserRepository } from "../../infra/repositories/user.repository"

export class CreateUserController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {

		const repository = new UserRepository();
    const { name, password } = req.body;

    const userExists = await repository.findByName(name);

		if (userExists) return badRequest(res, "Usuário já existe !");

		await repository.createUser({
			name: name,
			password: password
		})

		return sucess(res, "Usuario criado");

	} catch (err:any) {
			return serverError(res, err);
		}
	}
}
