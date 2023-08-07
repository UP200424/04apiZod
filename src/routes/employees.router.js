import { Router } from "express"; 
import * as controller from "../controllers/employees.controller.js"
import {z} from "zod"
import { validateRequest } from "zod-express-middleware"
import { employeeSchema } from "../models/employees.schema.js";

const router = Router();

router.post("/proc",controller.CreateWithProcedure);
router.get("/", controller.GetEmployees);
router.get("/:id", controller.GetOne);
router.post("/", validateRequest({body: employeeSchema}) ,controller.createEmployee);
router.delete("/:id", controller.deleteEmployee);
router.patch('/:id', controller.updateEmployee);

export default router;