import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { UserRepository } from "../../infra/repositories/user.repository"

import { serverError, sucess, badRequest, notFound }
from "../../../../core/presentation/helpers/helpers";

export class DeleteUserController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
		const user_id = String(req.params.userid)
		const repository = new UserRepository();
    const removed = await repository.delete(user_id);

		if (!removed) return badRequest(res, "usuário não foi removido");

		return sucess(res, removed);

	} catch (err:any) {
			return serverError(res, err);
		}
	}
}
