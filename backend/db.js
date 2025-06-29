const mongoose = require("mongoose");

// mongodb+srv://shubharora:shubharora@cluster0.3mwodev.mongodb.net/
mongoose.connect('mongodb+srv://shubharora:shubharora@cluster0.vw8at.mongodb.net/',{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}) ;

 

const db = mongoose.connection;

db.on('connected' ,()=>{
    console.log('connected to database')
})

db.on('error' ,()=>{
    console.log('error')
})


db.on('disconnected' ,()=>{
    console.log('disconnected to database')
})




const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
    
  },
  lastname: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true,

  }
});



const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);
module.exports = { User, Account };
