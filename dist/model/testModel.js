"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const testModel = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    duration: {
        type: String,
    },
    totalScore: {
        type: Number,
    },
    viewTest: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "questions",
        },
    ],
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("tests", testModel);
