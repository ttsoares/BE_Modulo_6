import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { serverError } from "../../../../core/presentation/helpers/helpers";
import { UserRepository } from "../../infra/repositories/user.repository"

export class DeleteUserController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {

			const user_id = Number(req.params.userid)
			const repository = new UserRepository();
			const findUser = await repository.getOne(user_id)

		if (!findUser) return res.status(404).send("Usuário não encontrado");

    const remove = await repository.delete(findUser.uid)
		return res.status(200).json(findUser);

	} catch (err:any) {
			return serverError(res, err);
		}
	}
}
