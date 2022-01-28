import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { serverError, sucess,
} from "../../../../core/presentation/helpers/helpers";
import { MessageRepository} from "../../infra/repositories/messages.repository"

export class CreateMessageController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {

			const repository = new MessageRepository();

			const user_id:number = Number(req.params.userid);
			const { description, details } = req.body;

			const message = await repository.create({
				description: description,
				details: details,
				user_id: user_id
			})

			return res.status(200).json(message);

		} catch (err:any) {
			return serverError(res, err);
		}
	}
}
