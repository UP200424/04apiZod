import { Router } from "express";
import * as controller from "../controllers/index.controller.js";
import employeesRouter from "./employees.router.js";
import usersRouter from "./users.router.js";
import citiesRouter from "./cities.router.js";

const router = Router();

router.get("/", (req,res) => {
    res.send("si jala")
})

router.get("/ping", controller.Ping)

router.use("/employees", employeesRouter);
router.use("/users", usersRouter);
router.use("/cities", citiesRouter)

export default router