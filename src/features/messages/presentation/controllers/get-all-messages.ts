import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MessageRepository} from "../../infra/repositories/messages.repository";

import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";
import { Message } from "../../domain/models/message"

import { serverError, sucess, badRequest, notFound }
from "../../../../core/presentation/helpers/helpers";

export class GetAllMessagesController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
			const user_id = req.params.userid;
			const cache = new CacheRepository();

			const messagesCache = await cache.get("messages");

			if (messagesCache) {
        return res.status(200).render('messages', {data:messagesCache});
      }

			const repository = new MessageRepository();
			const allMessages = await repository.getAll(user_id)

			if(!allMessages.length) return notFound(res);

			await cache.set("messages", allMessages);

			return res.status(200).render('messages', {data:allMessages});

} catch (err:any) {
			return serverError(res, err);
		}
	}
}
