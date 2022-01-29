import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { UserRepository } from "../../infra/repositories/user.repository"

import { serverError, sucess, badRequest, notFound }
from "../../../../core/presentation/helpers/helpers";

export class GetOneUserController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {

		const repository = new UserRepository();
    const user_id = String(req.params.userid)
    const findUser  = await repository.findById(user_id);

		if (!findUser) return notFound(res, "Usuário não encontrado");

    return sucess(res, findUser);

	} catch (err:any) {
			return serverError(res, err);
		}
	}
}
