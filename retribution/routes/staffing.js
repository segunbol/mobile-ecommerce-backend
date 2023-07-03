import express from "express";
import Staff from "../model/staff.js";
import jwt from 'jsonwebtoken';
import { isManager, isHumanResources, isManagerOrHumanResources, isEmployee } from "../retributeUtils.js";

const staffRoutes = express.Router();

staffRoutes.get("/", isManagerOrHumanResources ,async (req, res) => {
  const allStaff = await Staff.find();
  const un = req.body.role;
  console.log(un);
  res.status(200).send(allStaff);
});

staffRoutes.get('/:id', async(req,res)=>{
    const staff = await Staff.findById(req.params.id);

    if(!staff) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    
    res.status(200).send(staff);
})

staffRoutes.post("/", async (req, res) => {
  try {
    let staffs = new Staff({
      name: req.body.name,
      role: req.body.role,
      company_Id: req.body.company_Id,
    });
    const staff = await staffs.save();

    res.send(staff);
  } catch (ValidatorError) {
    res.send("Role can either be Employee, Manager or Human Resources");
  }
});

staffRoutes.post('/login', async (req, res) => {
    const staff = await Staff.findOne({ _id: req.body._id });
    const secret = process.env.SECRET;
    if (!staff) {
      return res.status(400).send("The staff not found");
    }
    if (staff) {
      const token = jwt.sign(
        {
          staffId: staff.id,
          role: staff.role,
          name: staff.name,
        },
        secret,
        { expiresIn: "30d" }
      );
  
      res.status(200).send({ staff: staff.name, token: token });
    } else {
      res.status(400).send("staff not found");
    }
  });

export default staffRoutes;

// "_id": "647dcd671807f223b9af13e6",
// "name": "Jinadu Amada",
// "role": "Human Resources",
// "company_Id": "Human Resources",