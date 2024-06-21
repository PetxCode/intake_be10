"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuestions = exports.getAllTested = exports.getAllTest = exports.creatingTest = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const lodash_1 = __importDefault(require("lodash"));
const testModel_1 = __importDefault(require("../model/testModel"));
const questionModel_1 = __importDefault(require("../model/questionModel"));
const creatingTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, totalScore, duration } = req.body;
        const testCrreated = yield testModel_1.default.create({
            title,
            totalScore,
            duration,
        });
        return res.status(200).json({
            message: "success",
            data: testCrreated,
        });
    }
    catch (err) {
        res.status(404).json({ message: "an error occured", err });
    }
});
exports.creatingTest = creatingTest;
const getAllTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var myLimit = 10;
        const getTest = yield testModel_1.default.find().populate({
            path: "viewTest",
            options: { limit: myLimit },
        });
        return res.status(200).json({
            message: "all test gotten",
            data: getTest,
        });
    }
    catch (err) {
        res.status(404).json({ message: "an error occured", err });
    }
});
exports.getAllTest = getAllTest;
const getAllTested = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTesst = yield questionModel_1.default.find();
        return res.status(200).json({
            message: "all test gotten",
            data: lodash_1.default.sampleSize(getTesst, 10),
        });
    }
    catch (err) {
        res.status(404).json({ message: "an error occured", err });
    }
});
exports.getAllTested = getAllTested;
const CreateQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const viewTest = yield testModel_1.default.findById(req.params.id);
        const { a, b, c, d, answer, question } = req.body;
        if (viewTest) {
            const createQuestion = yield questionModel_1.default.create({
                a,
                b,
                c,
                d,
                answer,
                question,
            });
            yield ((_a = viewTest === null || viewTest === void 0 ? void 0 : viewTest.viewTest) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(createQuestion === null || createQuestion === void 0 ? void 0 : createQuestion._id)));
            viewTest.save();
            return res
                .status(200)
                .json({ message: "test created successfull", data: createQuestion });
        }
        else {
            return res.status(404).json({ message: "ID is not found" });
        }
    }
    catch (err) {
        res.status(404).json({ message: "an error occured", err });
    }
});
exports.CreateQuestions = CreateQuestions;
