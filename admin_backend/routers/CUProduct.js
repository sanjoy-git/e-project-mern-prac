const express = require("express");
const fs = require('fs');
const connection = require('../models/DB');

const router = express.Router();

// Post Route
router.post("/", (req, res) => {
  try {
    if(req.file.filename){
      const url=req.protocol+'://'+req.get('host');
      const imgPath='/product_imgs/' + req.file.filename;
      const bodyData={
        productCategory:req.body.pCategory,
        productFileName:req.file.filename,
        productImg:url+imgPath,
        productTitle:req.body.pTitle,
        productDec:req.body.pDec,
        productSize:req.body.pSize,
        productMarketCost:req.body.pMarketCost,
        productSellCost:req.body.pSellCost,
        productStatus:"stock",
      }
      const sqlInsertQuery= "INSERT INTO `products`(`product_category`, `product_file_name`, `product_img`, `product_title`, `product_dec`, `product_size`, `product_market_cost`, `product_sell_cost`, `product_status`) VALUES ('"+bodyData.productCategory+"','"+bodyData.productFileName+"','"+bodyData.productImg+"','"+bodyData.productTitle+"','"+bodyData.productDec+"','"+bodyData.productSize+"','"+bodyData.productMarketCost+"','"+bodyData.productSellCost+"','"+bodyData.productStatus+"')"
      connection.query(sqlInsertQuery,(err)=>{
        if(err){
          next(err);
        }
        else{
          res.status(200).json({
            alert:`${new Date().getTime()}`,
            message:"Product Post Successfully"
          });
        }
      })
    }
    else{
      res.send(`Post Error! ${new Date().getTime()}`);
    }
  } catch (error) {
    res.status(500).json({
      Error:"Post Catch Error"
    })
  }
});

// Update Product
router.put("/:id",(req,res,next)=>{

  if(req.file.filename && req.params.id){
    const url=req.protocol+'://'+req.get('host');
    const imgPath='/product_imgs/'+req.file.filename;
    const productImg=url+imgPath;
    
    const sqlUpdateQuery= "UPDATE products SET product_file_name='"+req.file.filename+"', `product_img`='"+productImg+"' WHERE product_id='"+req.params.id+"' "
    connection.query(sqlUpdateQuery,(err)=>{
      if(err){
        next(err);
      }
      else{
        fs.unlink(`./public/product_imgs/${req.body.fileName}`,(err)=> {
          if (err){
            next(err)
          }
        });
      }
    });
    res.status(200).json({
      message:"update successfully",
      alert:`${new Date().getTime()}`
    })
  }
})


module.exports=router