import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MessageRepository} from "../../infra/repositories/messages.repository";

import { serverError, sucess, badRequest, notFound }
from "../../../../core/presentation/helpers/helpers";

export class GetAllMessagesController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {

			const repository = new MessageRepository();
			const user_id = String(req.params.userid);
			const allMessages = await repository.getAll(user_id)

			return res.status(200).render('messages', {data:allMessages});

} catch (err:any) {
			return serverError(res, err);
		}
	}
}
