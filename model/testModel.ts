import mongoose from "mongoose";

interface iTest {
  title: string;
  duration: string;
  totalScore: number;

  viewTest: {}[];
}

interface iTestResult extends iTest, mongoose.Document {}

const testModel = new mongoose.Schema(
  {
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<iTestResult>("tests", testModel);
