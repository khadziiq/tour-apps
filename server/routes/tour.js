import express from "express";
import {
  addTour,
  deleteTour,
  getTour,
  getTours,
  getToursByUser,
  updateTour,
} from "../controllers/tour.js";
const router = express.Router();
import auth from "../middleware/auth.js";

router.post("/", auth, addTour);
router.get("/", getTours);
router.get("/:id", getTour);
router.delete("/:id", auth, deleteTour);
router.patch("/:id", auth, updateTour);
router.get("/userTours/:id", auth, getToursByUser);

export default router;
