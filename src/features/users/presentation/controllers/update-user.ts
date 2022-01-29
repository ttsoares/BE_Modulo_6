import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { UserRepository } from "../../infra/repositories/user.repository";

import { serverError, sucess, badRequest, notFound }
from "../../../../core/presentation/helpers/helpers";

export class UpdateUserController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {

		const repository = new UserRepository();
    const user_id = String(req.params.userid);
		const { name, password }: { name: string; password: string } = req.body;

		// empty password is not allowed
		if ( password.replace(/\s+/g,'') === '') return badRequest(res, "Senha vazia !");

		const userUpdated = await repository.update({name, password, uid: user_id});

		if (!userUpdated) return notFound(res, "Usuário não encontrado");

		return sucess(res, userUpdated);

	} catch (err:any) {
			return serverError(res, err);
		}
	}
}
