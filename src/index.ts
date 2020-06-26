import express from "express";
import {AddressInfo} from "net";
import { userRouter } from "./router/UserRouter";
import { bandRouter } from "./router/BandRouter";
import { genreRouter } from "./router/GenreRouter";
import { albumRouter } from "./router/AlbumRouter";

const app = express();

app.use(express.json());

app.use("/users/", userRouter);
app.use("/bands/", bandRouter);
app.use("/genres", genreRouter);
app.use("/albums", albumRouter);

const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});