const express = require("express");
const zod = require("zod");
const { Account, User } = require("./../db");
const router = express.Router();
const mongoose = require("mongoose");
const authorization = require("./../middleware/authorization");

router.get("/balance", authorization, async (req, res) => {
  const userId = req.userId;

  const user = await Account.findOne({ userId });
  // const user_data = await User.findOne({ userId }) ;
  // const
  //console.log(user);

  res.status(201).json({ balance: user.balance });
});

// router.post('/transfer' , authorization , async(req, res) =>{

//     const session = await mongoose.startSession() ;
//     // session.startSession() ;
//     const {amount , to} = req.body ;

//     const account = await Account.findOne({userId : req.userId}) ;

//     if(!account || account.balance < amount){
//         await session.abortTransaction() ;
//         res.status(400).json({ message : 'Insufficient balance' }) ;
//     }

//     const toaccount = await Account.findOne({userId : to}).session(session) ;

//     if(!to.Account){
//         await session.abortTransaction() ;
//         res.status(400).json({ message : 'Insufficient balance' }) ;
//     }

//     await Account.updateOne({userId : req.userId} , {$inc : {balance: -amount}}).session(session) ;
//     await Account.updateOne({userId : to} , {$inc : {balance: amount}}).session(session) ;

//     await session.commitTransaction() ;
//     res.status(201).json({ message : 'Transfer successful' }) ;
// })
router.post("/transfer", authorization, async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const amount =  req.body.amount;
    const to  = req.body.to;

    // Fetch sender account
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );
    //console.log(req.userId) ;
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    

    // Fetch recipient account
    //console.log(to) ;
    const toAccount = await Account.find({userId : to }).session(session);

    if (!toAccount) {
        //console.log(toAccount) ;
      await session.abortTransaction();
      return res.status(400).json({ message: "Recipient account not found" });
    }

    

    // Perform the transfer
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();

    return res.status(201).json({ message: "Transfer successful" });
  } catch (error) {
    await session.abortTransaction();
    //console.error("Transfer failed:", error);
    return res
      .status(500)
      .json({ message: "Transfer failed, please try again later." });
  } finally {
    session.endSession();
  }
});

module.exports = router;
