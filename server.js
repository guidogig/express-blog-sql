import express from "express";
import { errorHandler, notFound } from "./middlewares/utilityMiddlewares.js";
import { postsRouter } from "./routers/postsRouter.js";

const app = express();
const port = 3000;

app.use(express.static("./public"));
app.use(express.json());

app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`Il server sta ascoltando sulla porta ${port}`);
});

app.use(errorHandler);
app.use(notFound);
