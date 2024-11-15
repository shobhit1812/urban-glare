import { Router } from "express";
import {
  toggleFavorite,
  getUserFavorites,
} from "../controllers/favorite.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/toggle-favorites").post(verifyJWT, toggleFavorite);
router.route("/get-all-favorites").get(verifyJWT, getUserFavorites);

export default router;
