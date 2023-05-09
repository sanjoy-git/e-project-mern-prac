const express = require("express");
const router = express.Router();

const con = require('../models/DB');

router.get("/",(req,res)=>{
  const sqlSelectQuery="SELECT * FROM `order`"
  con.query(sqlSelectQuery, function (err, result) {
    if (err){
      res.status(500).json({
        Error:err
      })
    }
    else{
      res.status(200).json(result);
    }
  });
})

router.get("/:id",(req,res)=>{
  const sqlSelectQuery="SELECT * FROM `order` WHERE status='"+req.params.id+"'"
  con.query(sqlSelectQuery, function (err, result) {
    if (err){
      res.status(500).json({
        Error:err
      })
    }
    else{
      res.status(200).json({
        result,
        message:"get successfully",
        alert:`${new Date().getTime()}`
      })
    }
  });
})

router.get("/search/:phoneNo",(req,res)=>{
  const sqlSelectQuery="SELECT * FROM `order` WHERE phone_no='"+req.params.phoneNo+"'"
  con.query(sqlSelectQuery, function (err, result) {
    if (err){
      res.status(500).json({
        Error:err
      })
    }
    else{
      res.status(200).json(result);
    }
  });
})



router.put("/status/:status",(req,res)=>{

  const status=req.body.data.status;

  const sqlSelectQuery="UPDATE `order` SET `status`='"+status+"' WHERE order_id='"+req.params.status+"'"
  con.query(sqlSelectQuery, function (err) {
    if (err){
      res.status(500).json({
        Error:err
      })
    }
    else{
      res.status(200).json({
        message:"updata successfully",
        alert:`${new Date().getTime()}`
      })
    }
  });
})

router.delete("/:id",(req,res)=>{
  const sqlSelectQuery="DELETE FROM `order` WHERE order_id='"+req.params.id+"'"
  con.query(sqlSelectQuery, function (err) {
    if (err){
      res.status(500).json({
        Error:err,
        message:"error",
        alert:`${new Date().getTime()}`        
      })
    }
    else{
      res.status(200).json({
        message:"delete successfully",
        alert:`${new Date().getTime()}`
      })
    }
  });
})



module.exports=router