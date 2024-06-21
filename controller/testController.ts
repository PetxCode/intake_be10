import mongoose from "mongoose";
import lodash from "lodash";
import { Request, Response } from "express";

import testModel from "../model/testModel";
import questionModel from "../model/questionModel";

export const creatingTest = async (req: Request, res: Response) => {
  try {
    const { title, totalScore, duration } = req.body;

    const testCrreated = await testModel.create({
      title,
      totalScore,
      duration,
    });

    return res.status(200).json({
      message: "success",
      data: testCrreated,
    });
  } catch (err) {
    res.status(404).json({ message: "an error occured", err });
  }
};

export const getAllTest = async (req: Request, res: Response) => {
  try {
    var myLimit = 10;
    const getTest = await testModel.find().populate({
      path: "viewTest",
      options: { limit: myLimit },
    });

    return res.status(200).json({
      message: "all test gotten",
      data: getTest,
    });
  } catch (err) {
    res.status(404).json({ message: "an error occured", err });
  }
};

export const getAllTested = async (req: Request, res: Response) => {
  try {
    const getTesst = await questionModel.find();

    return res.status(200).json({
      message: "all test gotten",
      data: lodash.sampleSize(getTesst, 10),
    });
  } catch (err) {
    res.status(404).json({ message: "an error occured", err });
  }
};

export const CreateQuestions = async (req: Request, res: Response) => {
  try {
    const viewTest = await testModel.findById(req.params.id);
    const { a, b, c, d, answer, question } = req.body;

    if (viewTest) {
      const createQuestion = await questionModel.create({
        a,
        b,
        c,
        d,
        answer,
        question,
      });

      await viewTest?.viewTest?.push(
        new mongoose.Types.ObjectId(createQuestion?._id)
      );

      viewTest.save();

      return res
        .status(200)
        .json({ message: "test created successfull", data: createQuestion });
    } else {
      return res.status(404).json({ message: "ID is not found" });
    }
  } catch (err) {
    res.status(404).json({ message: "an error occured", err });
  }
};
