import { Router } from "express";
import { getAllUsers } from "../controllers/users.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-all-users").get(verifyJWT, getAllUsers);

export default router;
