import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { serverError } from "../../../../core/presentation/helpers/helpers";
import { MessageRepository} from "../../infra/repositories/messages.repository"

export class DeleteMessageController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {

		try {

			const message_id = Number(req.params.messageid);

			const repository = new MessageRepository();

			const removedMessage = await repository.delete(message_id)

			return res.status(200).json(removedMessage);

} catch (err:any) {
			return serverError(res, err);
		}
	}
}
