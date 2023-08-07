import { Router } from "express"; 
import * as controller from "../controllers/cities.controller.js"

const router = Router();

router.get("/", controller.GetCities);

export default router;