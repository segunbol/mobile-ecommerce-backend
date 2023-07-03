import express from "express";
import Retribution from "../model/task.js";
import mongoose from "mongoose";
import { isManager, isHumanResources, isEmployee } from "../retributeUtils.js";

const taskRoutes = express.Router();

// View Task and Retributions
// View All T and R
// If HR, grant access to view Task for all Staff
// If Manager grant access to view Task of Only Team members
// Else Deny Access

taskRoutes.get("/" , async (req, res) => {

  
  const taskList = await Retribution.find();

  if (!taskList) {
    res.status(500).json({ success: false });
  }
  res.send(taskList);
});

// View Single T & R
// If HR, grant access to view Task for all Staff
// If Manager grant access to view Task of Only Team members
// If Employee grant access to view indivdual Task and Retribution

taskRoutes.get("/:id", async (req, res) => {
  const task = await Retribution.findById(req.params.id);

  if (!task) {
    res.status(500).json({ message: "There is no such Task" });
  } else {
    res.send(task);  
  }
  // ;
});

// Create Task and Retributions
// If HR, give access to Create T and R accross board
// If Manager, give access to Create T and R for only Team members
// Else Deny Access

taskRoutes.post("/", async (req, res) => {
  let tasks = new Retribution({
    company_Id: req.body.company_Id,
    task: req.body.task,
    type: req.body.type,
    variation: req.body.variation,
    roll_over: req.body.roll_over,
    roll_over_day: req.body.roll_over_day,
    bonus: req.body.bonus,
  });

  const task = await tasks.save();
  console.log(task.task);
  if (!task) {
    return res
      .status(400)
      .send(
        "Type can only be of value: Reward or Penalty and Variation can only be Compensation, Recognition, Award, Warning, Demotion, Suspension  "
      );
  }

  res.send(task);
});
// Edit Task and Retributions
// If HR, grant access to edit Task for all Staff
// If Manager grant access to edit Task of Only Team members
// Else Deny Access
// Delete Task and Retributions
// Delete All T and R
// If HR, grant access to delete Task for all Staff
// If Manager grant access to delete Task of Only Team members
// Else Deny Access

taskRoutes.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Retribution Id");
  }

  const task = await Retribution.findByIdAndUpdate(
    req.params.id,
    {
      company_Id: req.body.company_Id,
      task: req.body.task,
      type: req.body.type,
      variation: req.body.variation,
      roll_over: req.body.roll_over,
      roll_over_day: req.body.roll_over_day,
      bonus: req.body.bonus,
    },
    { new: true }
  );
  if (!task) {
    return res.status(500).send("The retribution does not exist");
  }
  res.send(task);
});

// Delete Single T and R
// If HR, grant access to delete Task for all Staff
// If Manager grant access to delete Task of Only Team members
// Else Deny Access

taskRoutes.delete("/:id", (req, res) => {
  Retribution.findByIdAndRemove(req.params.id)
    .then((task) => {
      if (task) {
        return res
          .status(200)
          .json({
            success: true,
            message: "the retribution is deleted is deleted!",
          });
      } else {
        return res
          .status(404)
          .json({
            success: false,
            message: "retribution not found not found!",
          });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

export default taskRoutes;

// "company_Id": "Transformation",
//     "task" : "Carry out COst Benefit Analysis on Digital Processing",
//     "type" : "Reward",
//     "variation" : "Award",
//     "roll_over" :"Quarterly",
//     "roll_over_day": "09/08/2023",
//     "bonus": 30
