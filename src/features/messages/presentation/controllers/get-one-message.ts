import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MessageRepository} from "../../infra/repositories/messages.repository";

import { serverError, sucess, badRequest, notFound }
from "../../../../core/presentation/helpers/helpers";

export class GetOneMessageController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
			const repository = new MessageRepository();

			const message_id = String(req.params.messageid);

			const oneMessage = await repository.getByUid(message_id)

			return sucess(res, oneMessage);

} catch (err:any) {
			return serverError(res, err);
		}
	}
}
