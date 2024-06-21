import express from "express";
import {
  CreateQuestions,
  creatingTest,
  getAllTest,
  getAllTested,
} from "../controller/testController";

const router = express.Router();

router.route("/createTest").post(creatingTest);
router.route("/viewTest").get(getAllTest);
router.route("/viewTested").get(getAllTested);
router.route("/:id/create-questions").post(CreateQuestions);

export default router;
