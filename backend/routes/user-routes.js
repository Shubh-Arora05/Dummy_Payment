const express = require('express') ;

const router = express.Router() ;

const userroutes = require('./user') ;
const accountroutes = require('./account') ;

router.use('/user' , userroutes ) ;
router.use('/account' , accountroutes ) ;

module.exports = router ;