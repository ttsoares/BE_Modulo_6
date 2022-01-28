import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { serverError, sucess,
} from "../../../../core/presentation/helpers/helpers";
import { UserRepository } from "../../infra/repositories/user.repository"

export class GetOneUserController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {

		const repository = new UserRepository();

    const user_id:number = Number(req.params.userid)
    const findUser  = await repository.getOne(user_id);

    const temp:object = { name: findUser!.name, password: findUser!.password };
    return res.status(200).json(temp);


	} catch (err:any) {
			return serverError(res, err);
		}
	}
}
