import express, { Request, Response } from "express";
import cors from "cors";
import UserRoutes from "../../features/users/presentation/routes/routes";
import MessageRoutes from "../../features/messages/presentation/routes/routes";

export default class App {
  readonly #express: express.Express;

  constructor() {
    this.#express = express();
  }

  public init() {
    this.middlewares();
    this.routes();
  }

  public middlewares() {
    this.#express.use(cors());
    this.#express.use(express.json());
    this.#express.set('view engine', 'ejs')
  }

  public routes() {
    this.#express.get("/", (req: Request, res: Response) => {
      return res.status(200).send("Rodando...");
    });

    const userRoutes = new UserRoutes().init();
    this.#express.use(userRoutes);

    const messageRoutes = new MessageRoutes().init();
    this.#express.use(messageRoutes);
  }

  public start(port: string) {
    this.#express.listen(port, () => {
      console.log(`Servidor escutando na porta -- ${port}`);
    });
  }
}
