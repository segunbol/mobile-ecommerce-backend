import mongoose from "mongoose";

const retributionsSchema = new mongoose.Schema({
  company_Id: {
    type: String,
    required: true,
  },
  task: {
    type: String,
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
    required: true,
  },
});

retributionsSchema.set("toJSON", {
  virtuals: true,
});

const Retribution = mongoose.model("Retributions", retributionsSchema);

export default Retribution;
