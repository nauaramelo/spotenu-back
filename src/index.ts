import express from "express";
import { userRouter } from "./router/UserRouter";
import { bandRouter } from "./router/BandRouter";
import { genreRouter } from "./router/GenreRouter";
import { albumRouter } from "./router/AlbumRouter";
import { musicRouter } from "./router/MusicRouter";

const app = express();
app.use(express.json());

app.use("/users/", userRouter);
app.use("/bands/", bandRouter);
app.use("/genres", genreRouter);
app.use("/albums", albumRouter);
app.use("/musics", musicRouter);

export default app;
/* 
const server = app.listen(3001, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
}); */