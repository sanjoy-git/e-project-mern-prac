const express = require("express");
const connection=require('../models/DB');

const router = express.Router();

router.post("/order",(req,res)=>{
  const {
    name,
    address,
    phoneNo,
    totalAmount,
    advanceAmount,
    bkashtrxId,
    cartProducts
  } = req.body.data

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  const orderDate = mm + '/' + dd + '/' + yyyy;

  const sqlSelectQuery="SELECT `bkashtrx_id` FROM `order` WHERE bkashtrx_id='"+req.body.bkashtrxId+"'";
  connection.query(sqlSelectQuery,(err,result)=>{
    if(err){
      res.status(500).json({
        Error:"error",
        message:"error"
      })
    }
    else if(result[0]){
      res.status(200).json({
        message:"please new bkash trxid use !"
      })
    }
    else{
      const sqlInsertQuery="INSERT INTO `order`(`name`, `address`, `phone_no`, `total_amount`, `advance_amount`, `bkashtrx_id`, `id_price_quantity`,`order_date`, `status`) VALUES ('"+name+"','"+address+"','"+phoneNo+"','"+totalAmount+"','"+advanceAmount+"','"+bkashtrxId+"','"+cartProducts+"','"+orderDate+"','pending')"
      connection.query(sqlInsertQuery,(err)=> {
        if (err){
          res.status(500).json({
            Error:"get data error",
            message:"error"
          })
        }
        else{
          console.log("order pending")
          res.status(200).json({
            message:"Please waite fot seller approval ! And check"
          });
        }
      });
    }
  })
})


router.get("/orderSearch/:phoneNo",(req,res)=>{
  const sqlSelectQuery="SELECT * FROM `order` WHERE phone_no='"+req.params.phoneNo+"'"
  connection.query(sqlSelectQuery, function (err, result) {
    if (err){
      res.status(500).json({
        Error:err
      })
    }
    else{
      res.status(200).json({
        result,
        message:"susses"
      });
    }
  });
})

module.exports=router