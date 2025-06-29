const express = require("express");
const app = express();

const port = 5000;
const cors = require('cors') ;
const db = require('./db') ;
const user_routes = require('./routes/user-routes') ;
app.use(cors()) ;
app.listen(port) ;
app.use(express.json()) ;

app.use('/api/v1' ,user_routes) ;

module.exports = app ;