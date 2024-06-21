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
exports.viewUserStatus = exports.loginUser = exports.updatingPsycho = exports.updatingLeadership = exports.updatingLogic = exports.registerUser = exports.getUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const streamifier_1 = __importDefault(require("streamifier"));
const crypto_1 = __importDefault(require("crypto"));
const userModel_2 = __importDefault(require("../model/userModel"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getting = yield userModel_1.default.find({ new: true });
    res.status(200).json({
        message: "successful",
        data: getting,
    });
});
exports.getUser = getUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, interest, address, profile, logic, logicToggle, leadership, leadershipToggle, psycho, psychoToggle, } = req.body;
        const user = yield userModel_1.default.findOne({ email: email });
        if (user) {
            return res.status(404).json({ message: "user already registered" });
        }
        // const img = await cloudinary.uploader.upload(req?.file!.path);
        const coded = crypto_1.default.randomBytes(2).toString("hex");
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                let stream = yield cloudinary_1.default.uploader.upload_stream((error, result) => {
                    if (result) {
                        return resolve(result);
                    }
                    else {
                        return reject(error);
                    }
                });
                yield streamifier_1.default.createReadStream(req === null || req === void 0 ? void 0 : req.file.buffer).pipe(stream);
            }));
        };
        const img = yield streamUpload(req);
        const regUser = yield userModel_1.default.create({
            name: name.trim(),
            email,
            phone,
            interest,
            address,
            profile,
            avatar: img.secure_url,
            logic,
            logicToggle,
            leadership,
            leadershipToggle,
            psycho,
            psychoToggle,
            code: coded,
        });
        res.status(200).json({
            message: "successful",
            data: regUser,
        });
    }
    catch (err) {
        res.status(400).json({
            message: err,
        });
    }
});
exports.registerUser = registerUser;
const updatingLogic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { logic } = req.body;
        const editStatus = yield userModel_1.default.findByIdAndUpdate(req.params.id, {
            logic,
            logicToggle: true,
        }, { new: true });
        res.status(200).json(editStatus);
    }
    catch (err) {
        res.status(404).json({ message: "an error occured", err });
    }
});
exports.updatingLogic = updatingLogic;
const updatingLeadership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { leadership } = req.body;
        const editStatus = yield userModel_1.default.findByIdAndUpdate(req.params.id, {
            leadership,
            leadershipToggle: true,
        }, { new: true });
        res.status(200).json(editStatus);
    }
    catch (err) {
        res.status(404).json({ message: "an error occured", err });
    }
});
exports.updatingLeadership = updatingLeadership;
const updatingPsycho = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { psycho } = req.body;
        const editStatus = yield userModel_1.default.findByIdAndUpdate(req.params.id, {
            psycho,
            psychoToggle: true,
            done: true,
        }, { new: true });
        res.status(200).json(editStatus);
    }
    catch (err) {
        res.status(404).json({ message: "an error occured", err });
    }
});
exports.updatingPsycho = updatingPsycho;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const getUser = yield userModel_2.default.findOne({ email });
        if (getUser) {
            return res.status(200).json({
                message: "All the Best",
                data: getUser,
            });
        }
        else {
            return res.status(404).json({
                message: "User With this name is not Found",
            });
        }
    }
    catch (err) {
        res.status(404).json({ message: "an error occured", err });
    }
});
exports.loginUser = loginUser;
const viewUserStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const getUser = yield userModel_1.default.findOne({ name });
        if (getUser) {
            if (!(getUser === null || getUser === void 0 ? void 0 : getUser.logicToggle)) {
                return res.status(200).json({
                    message: "Welcome",
                    data: getUser,
                });
            }
            else {
                return res.status(404).json({
                    message: "you have already taken the test",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "User With this name is not Found",
            });
        }
    }
    catch (err) {
        res.status(404).json({ message: "an error occured", err });
    }
});
exports.viewUserStatus = viewUserStatus;
