import express from "express";
import taskRoutes from "./retribution/routes/retribute.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import staffRoutes from "./retribution/routes/staffing.js";
import authJwt from "./retribution/retributeUtils.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(morgan("tiny"));
// app.use(authJwt())


const user = " ";
// routes
app.use("/api/v1/staffs", staffRoutes)
app.use("/api/v1/retributions", taskRoutes);


const port = 3000;
app.listen(port, () => {
  console.log("I am fired Up");
});

// if(user === "HRM") {
//     res.send("You Can Create a Task, Reward and Retribution now!")
// }

// if (user === "Team Lead") {
//     res.send("You can view task of your team members")
// }
// else {
//     res.send("You can View Your Task, Reward and Retribution")
// }
