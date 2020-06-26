import express from "express";
import {AddressInfo} from "net";
import { userRouter } from "./router/UserRouter";
import { bandRouter } from "./router/BandRouter";
import { genreRouter } from "./router/GenreRouter";

const app = express();

app.use(express.json());

app.use("/users/", userRouter);
app.use("/bands/", bandRouter);
app.use("/genres", genreRouter);

const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});