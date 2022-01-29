import App from "./core/presentation/app";
import Database from "./core/infra/data/connections/database";
import Redis from "./core/infra/data/connections/redis";
import 'dotenv/config'
import "reflect-metadata";

Promise.all([new Database().openConnection(), new Redis().openConnection()])
  .then(() => {
    const app = new App();
    app.init();
    app.start(process.env.PORT || "8888");
  })
  .catch((err) => {
    console.log(err);
  });
