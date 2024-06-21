import { Request, Response } from "express";
import userData from "../model/userModel";
import cloudinary from "../utils/cloudinary";
import path from "path";
import streamifier from "streamifier";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import crypto from "crypto";
import userModel from "../model/userModel";

export const getUser = async (req: Request, res: Response) => {
  const getting = await userData.find({ new: true });

  res.status(200).json({
    message: "successful",
    data: getting,
  });
};

export const registerUser = async (req: any, res: Response) => {
  try {
    const {
      name,
      email,
      phone,
      interest,
      address,
      profile,

      logic,
      logicToggle,

      leadership,
      leadershipToggle,

      psycho,
      psychoToggle,
    } = req.body;

    const user = await userData.findOne({ email: email });

    if (user) {
      return res.status(404).json({ message: "user already registered" });
    }

    // const img = await cloudinary.uploader.upload(req?.file!.path);

    const coded = crypto.randomBytes(2).toString("hex");

    let streamUpload = (req: any) => {
      return new Promise(async (resolve: any, reject: any) => {
        let stream: string | any = await cloudinary.uploader.upload_stream(
          (error: any, result: Buffer) => {
            if (result) {
              return resolve(result);
            } else {
              return reject(error);
            }
          }
        );
        await streamifier.createReadStream(req?.file!.buffer!).pipe(stream);
      });
    };

    const img: any = await streamUpload(req);

    const regUser = await userData.create({
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
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};

export const updatingLogic = async (req: Request, res: Response) => {
  try {
    const { logic } = req.body;
    const editStatus = await userData.findByIdAndUpdate(
      req.params.id,
      {
        logic,
        logicToggle: true,
      },
      { new: true }
    );

    res.status(200).json(editStatus);
  } catch (err) {
    res.status(404).json({ message: "an error occured", err });
  }
};

export const updatingLeadership = async (req: Request, res: Response) => {
  try {
    const { leadership } = req.body;
    const editStatus = await userData.findByIdAndUpdate(
      req.params.id,
      {
        leadership,
        leadershipToggle: true,
      },
      { new: true }
    );

    res.status(200).json(editStatus);
  } catch (err) {
    res.status(404).json({ message: "an error occured", err });
  }
};

export const updatingPsycho = async (req: Request, res: Response) => {
  try {
    const { psycho } = req.body;
    const editStatus = await userData.findByIdAndUpdate(
      req.params.id,
      {
        psycho,
        psychoToggle: true,
        done: true,
      },
      { new: true }
    );

    res.status(200).json(editStatus);
  } catch (err) {
    res.status(404).json({ message: "an error occured", err });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const getUser = await userModel.findOne({ email });

    if (getUser) {
      return res.status(200).json({
        message: "All the Best",
        data: getUser,
      });
    } else {
      return res.status(404).json({
        message: "User With this name is not Found",
      });
    }
  } catch (err) {
    res.status(404).json({ message: "an error occured", err });
  }
};

export const viewUserStatus = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const getUser = await userData.findOne({ name });

    if (getUser) {
      if (!getUser?.logicToggle) {
        return res.status(200).json({
          message: "Welcome",
          data: getUser,
        });
      } else {
        return res.status(404).json({
          message: "you have already taken the test",
        });
      }
    } else {
      return res.status(404).json({
        message: "User With this name is not Found",
      });
    }
  } catch (err) {
    res.status(404).json({ message: "an error occured", err });
  }
};
