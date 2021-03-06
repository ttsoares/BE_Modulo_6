import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MessageRepository} from "../../infra/repositories/messages.repository";

import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";

import { Message } from "../../domain/models/message";

import { serverError, sucess, badRequest, notFound }
from "../../../../core/presentation/helpers/helpers";

export class UpdateMessageController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
			const message_id = req.params.messageid;
			const { description, details } = req.body;

			const repository = new MessageRepository();

			const message = await repository.update({
				description: description, details: details, uid:message_id
			});

			if (!message) return notFound(res, "Mensagem não encontrada !");

			const cache = new CacheRepository();
			await cache.delete(`thomas:${message.user_id}:messages`);
			await cache.set(`thomas:message:${message.uid}`, message);

			return sucess(res, message);

		} catch (err:any) {
			return serverError(res, err);
		};
	};
};
