const express = require("express");
const con=require('../models/DB');

const router = express.Router();

router.get("/sitetext",(req,res)=>{
  const sqlSelectQuery="SELECT * FROM `site_text`"
  con.query(sqlSelectQuery, function (err, result) {
    if (err){
      res.status(500).json({
        Error:err,
        message:"faild"
      })
    }
    else{
      res.status(200).json(
        {
          result,
          message:"success"
        }
      );
    }
  });
})

module.exports=router