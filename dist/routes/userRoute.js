"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
// import upload from "../Utils/multer";
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("avatar");
const router = express_1.default.Router();
router.get("/", userController_1.getUser);
// router.get("/:id", getUser);
router.post("/register", upload, userController_1.registerUser);
router.post("/login", userController_1.loginUser);
router.patch("/logical-score/:id", userController_1.updatingLogic);
router.patch("/leadership-score/:id", userController_1.updatingLeadership);
router.patch("/psychological-score/:id", userController_1.updatingPsycho);
exports.default = router;
