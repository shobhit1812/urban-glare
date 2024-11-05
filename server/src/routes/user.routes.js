import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-all-users").get(verifyJWT, getAllUsers);
router.route("/:id").get(verifyJWT, getUserById);

export default router;
