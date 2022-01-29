import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MessageRepository} from "../../infra/repositories/messages.repository";

import { serverError, sucess, badRequest, notFound }
from "../../../../core/presentation/helpers/helpers";

export class CreateMessageController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {

			const repository = new MessageRepository();
			const user_id = String(req.params.userid);
			const { description, details } = req.body;

			const message = await repository.create({
				description: description,
				details: details,
				user_id: user_id
			})

			return sucess(res, message);

		} catch (err:any) {
			return serverError(res, err);
		}
	}
}
