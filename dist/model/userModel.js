"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userModel = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    avatar: {
        type: String,
    },
    logic: {
        type: Number,
        default: 0,
    },
    logicToggle: {
        type: Boolean,
        default: false,
    },
    leadership: {
        type: Number,
        default: 0,
    },
    leadershipToggle: {
        type: Boolean,
        default: false,
    },
    done: {
        type: Boolean,
        default: false,
    },
    psycho: {
        type: Number,
        default: 0,
    },
    psychoToggle: {
        type: Boolean,
        default: false,
    },
    code: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    interest: {
        type: String,
    },
    profile: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("user10s", userModel);
