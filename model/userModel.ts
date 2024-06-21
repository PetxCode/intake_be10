import mongoose from "mongoose";

interface iUser {
  name: string;
  email: string;
  phone: string;
  address: string;
  interest: string;
  profile: string;

  avatar: string;
  done: boolean;
  logic: number;
  logicToggle: boolean;

  leadership: number;
  leadershipToggle: boolean;

  psycho: number;
  psychoToggle: boolean;
}

interface iTestResult extends iUser, mongoose.Document {}

const userModel = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<iTestResult>("user10s", userModel);
