import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
  updatingLeadership,
  updatingLogic,
  updatingPsycho,
} from "../controller/userController";
// import upload from "../Utils/multer";
import multer from "multer";

const upload = multer().single("avatar");

const router = express.Router();

router.get("/", getUser);
// router.get("/:id", getUser);

router.post("/register", upload, registerUser);
router.post("/login", loginUser);

router.patch("/logical-score/:id", updatingLogic);
router.patch("/leadership-score/:id", updatingLeadership);
router.patch("/psychological-score/:id", updatingPsycho);

export default router;
