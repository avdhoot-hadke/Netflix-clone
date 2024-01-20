import express from "express";
import {
  addToLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/add", addToLikedMovies);
router.get("/liked/:email", getLikedMovies);
router.put("/delete", removeFromLikedMovies);
export default router;
