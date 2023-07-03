import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Employee", "Manager", "Human Resources"],
    required: true,
  },
  company_Id: { type: String, required: true },
});

const Staff = mongoose.model("Staff", staffSchema)

export default Staff
