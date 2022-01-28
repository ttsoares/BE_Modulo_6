import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { serverError, sucess,
} from "../../../../core/presentation/helpers/helpers";
import { UserRepository } from "../../infra/repositories/user.repository"

export class UpdateUserController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {

		const repository = new UserRepository();

    const user_id:number = Number(req.params.userid);
		const { name, password }: { name: string; password: string } = req.body;

		// empty password is not allowed
		if ( password.replace(/\s+/g,'') === '') return res.status(400).send("Senha vazia !");

		const findUser = await repository.getOne(user_id);
		findUser!.name = name;
		findUser!.password = password;

		await repository.update(findUser!);

		return res.status(200).json(findUser);

	} catch (err:any) {
			return serverError(res, err);
		}
	}
}
