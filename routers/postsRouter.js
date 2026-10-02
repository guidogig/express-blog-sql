import express from "express";
import * as postsController from "../controllers/postsController.js";
//import { checkTime } from "../middlewares/checkTime.js";
//import { errorHandler } from "../middlewares/utilityMiddlewares.js";

const postsRouter = express.Router();

//postsRouter.use(checkTime);
//postsRouter.use(errorHandler);

//index
postsRouter.get("/", postsController.index);

//show
postsRouter.get("/:id", postsController.show);

//store
postsRouter.post("/", postsController.store);

//update
postsRouter.put("/:id", postsController.update);

//modify
postsRouter.patch("/:id", postsController.modify);

//destroy
postsRouter.delete("/:id", postsController.destroy);

export { postsRouter };
