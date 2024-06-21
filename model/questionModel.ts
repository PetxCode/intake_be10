import mongoose from "mongoose";

interface iTest {
  question: string;
  answer: string;
  a: string;
  b: string;
  c: string;
  d: string;

  test: {};
}

interface iTestResult extends iTest, mongoose.Document {}

const questionModel = new mongoose.Schema(
  {
    question: {
      type: String,
      require: true,
    },
    answer: {
      type: String,
      require: true,
    },

    a: {
      type: String,
      require: true,
    },
    b: {
      type: String,
      require: true,
    },

    c: {
      type: String,
      require: true,
    },

    d: {
      type: String,
      require: true,
    },

    test: {
      type: mongoose.Types.ObjectId,
      ref: "tests",
    },
  },
  { timestamps: true },
);

export default mongoose.model<iTestResult>("questions", questionModel);
