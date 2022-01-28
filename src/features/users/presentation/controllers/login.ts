import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller"
import { serverError, sucess,
} from "../../../../core/presentation/helpers/helpers";
import { UserRepository } from "../../infra/repositories/user.repository"

export class LoginUserController implements Controller{
  async handle(req: Request, res: Response): Promise<any> {
		try {

      const repository = new UserRepository();

      const { name, password } = req.body;

      const userExists = await repository.signIn(name);

      if (!userExists) return res.status(404).send("Usuário não encontrado");

      if (userExists.name === name && userExists.password === password)
        return res.status(200).send(`${userExists.uid}`);

      else return res.status(400).send("Senha errada");

    } catch (err:any) {
  			return serverError(res, err);
  		}
  }
}
