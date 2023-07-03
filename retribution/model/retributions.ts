import mongoose from "mongoose";
import { Schema, PaginateModel, model } from "mongoose";
import { IRetributions } from "./type";
import paginate from "mongoose-paginate-v2";

const retributionsSchema = new Schema<IRetributions>(
  {
    company_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    department_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: ["Reward", "Penalty"],
      required: true,
    },
    variation: {
      type: String,
      enum: [
        "Compensation",
        "Recognition",
        "Award",
        "Warning",
        "Demotion",
        "Suspension",
      ],
      required: true,
    },
    roll_over: {
      type: String,
      enum: ["Monthly", "Quarterly", "Yearly"],
      required: true,
    },
    roll_over_day: {
      type: Date,
      required: true,
    },
    bonus: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform(_doc, ret) {
        delete ret.__v;
      },
    },
    toJSON: {
      getters: true,
      virtuals: true,
      transform(_doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

retributionsSchema.plugin(paginate);
const Retributions = model<IRetributions, PaginateModel<IRetributions>>(
  "Feedback",
  retributionsSchema
);

export default Retributions;
