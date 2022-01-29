import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MessageRepository} from "../../infra/repositories/messages.repository";

import { serverError, sucess, badRequest, notFound }
from "../../../../core/presentation/helpers/helpers";

export class UpdateMessageController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
			const repository = new MessageRepository();
			const message_id = String(req.params.messageid);
			const { description, details } = req.body;

			const message = await repository.update({
				description: description, details: details, uid:message_id
			})

			return sucess(res, message);

		} catch (err:any) {
			return serverError(res, err);
		}
	}
}
