const express = require("express");
const fs=require('fs');
const router = express.Router();

const connection = require('../models/DB');

router.get("/read", (req, res) => {
  const sqlSelectQuery="SELECT * FROM `products`"
  connection.query(sqlSelectQuery, function (err, result) {
    if (err){
      res.status(500).json({
        Error:err,
        message:"Data get Problem"
      })
    }
    else{
      res.status(200).json(result);
    }
  });
});

router.get("/read/:pId", (req, res) => {
  const sqlSelectQuery="SELECT * FROM `products` WHERE product_id='"+req.params.pId+"'"
  connection.query(sqlSelectQuery, function (err, result, fields) {
    if (err){
      res.status(500).json({
        Error:"get data error"
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
});


// Update Product
router.put("/update/:id", (req,res)=>{
  console.log(req.params.id)
  if(req.params.id){
    const {title,category,decription,size,marketCost,sellCost,status}=req.body.data
    const sqlDeleteQuery= "UPDATE products SET product_category='"+category+"', `product_title`='"+title+"', `product_dec`='"+decription+"', `product_size`='"+size+"', product_market_cost='"+marketCost+"', product_sell_cost='"+sellCost+"', product_status='"+status+"'  WHERE product_id='"+req.params.id+"' "
    connection.query(sqlDeleteQuery,(err)=>{
      if(err){
        next(err);
      }
    });
    res.status(200).json({
      message:"update successfully",
      alert:`${new Date().getTime()}`
    })
  }
})

// Delete Route
router.delete("/delete/:id",(req,res)=>{

  if(req.body.fileName && req.params.id){

    fs.unlink(`./public/product_imgs/${req.body.fileName}`,(err)=> {
      console.log(req.body.fileName)
      if (err){
        next(err)
      }
    });

    const sqlDeleteQuery= "DELETE FROM `products` WHERE product_id='"+req.params.id+"' "
    connection.query(sqlDeleteQuery,(err)=>{
      if(err){
        next(err);
      }
    });
    res.status(200).json({
      message:"Delete successfully",
      alert:`${new Date().getTime()}`
    })
  }
  else{
    res.status(500).json({
      message:"Delete Wrong",
      alert:`${new Date().getTime()}`
    })
  }
})

module.exports = router;