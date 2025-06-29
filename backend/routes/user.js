const express = require("express");
const zod = require("zod");
const jwt = require('jsonwebtoken') ;
const {User ,Account} = require('./../db') ;
// require('dotenv').config() ;
const jwt_secret = "123";
const router = express.Router();
const  authorization  = require("./../middleware/authorization");



const signUpBody = zod.object({
  username: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string(),
});

router.post("/signUp",  async (req, res) => {
  const { success } = signUpBody.safeParse(req.body);
  console.log(success)  ;
  if (!success) {
    return res.status(411).json({
      message: "zod fails / Incorrect inputs",
      error : success,
    });
  }

  const check = await User.findOne({
    username: req.body.username,
  });
  console.log("check" ,check) ;

  if (check) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const new_user = await User.create({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  });
  const userId = new_user._id;

  const account = await Account.create({
    userId ,
    balance : 1 + Math.random()*10000 ,
  })

  // //console.log("userid" , userId) ;
  // //console.log("balance" , account) ;
  const token = jwt.sign({ userId }, jwt_secret);
  res.status(200).json({ msg: "User created Successfully", token: token });
});

const signIn = zod.object({
   
  username: zod.string(),
  password: zod.string(),
});


router.post("/signIn", async (req,res) => {
  const { success } = signIn.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const check = await User.findOne({
    username: req.body.username,
  });

  if (check) {
    const token = jwt.sign({ userId: check._id }, jwt_secret);

    res.json({ token: token , firstname : check.firstname });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

const updateBody = zod.object({
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
  password: zod.string().optional(),
});

router.put("/", authorization, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  
  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
});



module.exports = router;
