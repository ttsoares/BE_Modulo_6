import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { MessageRepository} from "../../infra/repositories/messages.repository";

import { CacheRepository } from "../../../../core/infra/repositories/cache.repository";

import { serverError, sucess, badRequest, notFound }
from "../../../../core/presentation/helpers/helpers";

export class GetOneMessageController implements Controller{
	async handle(req: Request, res: Response): Promise<any> {
		try {
			const message_id = String(req.params.messageid);

			const cache = new CacheRepository();
			const messageCache = await cache.get(`message:${message_id}`);

			if (messageCache) {
        return sucess(res, Object.assign({}, messageCache, { _cache: true }));
      }

			const repository = new MessageRepository();
			const oneMessage = await repository.getByUid(message_id)

			if (!oneMessage)  return notFound(res);

			await cache.set(`message:${oneMessage.uid}`, oneMessage);

			return sucess(res, oneMessage);

} catch (err:any) {
			return serverError(res, err);
		}
	}
}
