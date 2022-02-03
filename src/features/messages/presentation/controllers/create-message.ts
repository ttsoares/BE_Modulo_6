import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MessageRepository} from "../../infra/repositories/messages.repository";

import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";

import { serverError, sucess, badRequest, notFound }
from "../../../../core/presentation/helpers/helpers";

export class CreateMessageController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
			const user_id = req.params.userid;
			const { description, details } = req.body;

			const repository = new MessageRepository();
			const message = await repository.createMessage({
				description: description,
				details: details,
				user_id: user_id
			});

			if (!message) return badRequest(res, "Problema ao escrever do DB !");

			const cache = new CacheRepository();
			const result = await cache.set(`thomas:message:${message.uid}`, message);

			if (!result) console.log("NÃO SALVOU NO CACHE");
			
			await cache.delete(`thomas:${user_id}:messages`);

			return sucess(res, message);

		} catch (err:any) {
			return serverError(res, err);
		}
	}
}
