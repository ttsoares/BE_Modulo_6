import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MessageRepository} from "../../infra/repositories/messages.repository";

import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";

import { serverError, sucess, badRequest, notFound }
from "../../../../core/presentation/helpers/helpers";

export class CreateMessageController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
			const repository = new MessageRepository();
			const cache = new CacheRepository();

			const user_id = String(req.params.userid);
			const { description, details } = req.body;

			const message = await repository.create({
				description: description,
				details: details,
				user_id: user_id
			});

			const result = await cache.set(`message:${message!.uid}`, message);

			if (!result) console.log("NÃO SALVOU NO CACHE");

			await cache.delete("messages");

			return sucess(res, message);

		} catch (err:any) {
			return serverError(res, err);
		}
	}
}
