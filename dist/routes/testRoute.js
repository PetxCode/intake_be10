"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testController_1 = require("../controller/testController");
const router = express_1.default.Router();
router.route("/createTest").post(testController_1.creatingTest);
router.route("/viewTest").get(testController_1.getAllTest);
router.route("/viewTested").get(testController_1.getAllTested);
router.route("/:id/create-questions").post(testController_1.CreateQuestions);
exports.default = router;
