const express = require("express");
const con=require('../models/DB');

const router = express.Router();

// router.get("/products", (req, res) => {
//   const sqlSelectQuery="SELECT * FROM `products`"
//   con.query(sqlSelectQuery, function (err, result, fields) {
//     if (err){
//       res.status(500).json({
//         Error:"get data error"
//       })
//     }
//     else{
//       res.status(200).json(result);
//     }
//   });
// });

router.get("/products/:pId", (req, res) => {
  const sqlSelectQuery="SELECT * FROM `products` WHERE product_id='"+req.params.pId+"'"
  con.query(sqlSelectQuery, function (err, result, fields) {
    if (err){
      res.status(500).json({
        Error:"get data error",
        message:"faild"
      })
    }
    else{
      res.status(200).json({
        result,
        message:"success"
      });
    }
  });
});

router.get("/products/category/:category", (req, res) => {
  let sqlSelectQuery;
  if(req.params.category=='all'){
    sqlSelectQuery="SELECT * FROM `products`"
  }
  else{
    sqlSelectQuery="SELECT * FROM `products` WHERE product_category='"+req.params.category+"'"
  }
  con.query(sqlSelectQuery, function (err, result, fields) {
    if (err){
      res.status(500).json({
        Error:"get data error"
      })
    }
    else{
      res.status(200).json(result);
    }
  });
});


module.exports=router