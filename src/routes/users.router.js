import { Router } from "express"; 
import * as controller from "../controllers/users.controller.js"
import { validateRequest } from "zod-express-middleware";
import { usersSchema } from "../models/users.schema.js";

const router = Router();
router.post("/login", controller.login);
router.post("/", validateRequest({body: usersSchema}), controller.createUser);
router.get("/", controller.getUser);
export default router;