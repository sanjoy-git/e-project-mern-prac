const express = require("express");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

const connection = require('../models/DB');

const router = express.Router();

router.post("/login",(req, res, next) => {
  const JWT_SECRET="w1D";
  const userName=req.body.userName;
  const sqlSelectQuery="SELECT * FROM `admin` WHERE user_name='"+userName+"'";
  connection.query(sqlSelectQuery, function (err, result) {
    if (err){
      res.status(500).json({
        Error:err,
        message:"Data error"
      })
    }
    else{
      if(result[0]){
        const adminName=result[0].admin_name;
        const userName=result[0].user_name
        bcrypt.compare(req.body.password, result[0].admin_password, function(err, result) {
          if(err){
            res.status(500).json({
              Error:err,
              message:"login faild"
            })
          }
          else{
            if(result){
              jwt.sign({userName},JWT_SECRET,{expiresIn:'1h'},(err,token)=>{
                if(err){
                  res.status(500).json({
                    Error:err,
                    message:"login faild"
                  })
                }
                else if(token){
                  res.status(200).json({
                    message:"login successfully",
                    adminName: adminName,
                    token:"Bearer "+ token
                  });
                }
                else{
                  res.status(500).json({
                    message:"login faild"
                  })
                }
              })
            }
            else{
              res.status(200).json({
                message:"login faild"
              })
            }          
          }
        });
      }
      else{
        res.status(200).json({
          message:"login faild"
        });
      }
    }
  });
});

module.exports=router
