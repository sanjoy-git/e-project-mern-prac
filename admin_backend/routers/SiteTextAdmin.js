const express = require("express");
const router = express.Router();

const connection = require('../models/DB');


router.get("/",(req,res)=>{
  const sqlSelectQuery="SELECT * FROM `site_text`"
  connection.query(sqlSelectQuery, function (err, result) {
    if (err){
      res.status(500).json({
        Error:err,
        message:"faild",
        alert:`${new Date().getTime()}`
      })
    }
    else{
      res.status(200).json({
        result,
        message:"successful",
        alert:`${new Date().getTime()}`
      })
    }
  });
})


router.put("/:id",(req,res)=>{
  if(req.params.id){
    const {
      orderNumber,
      bkashNumber,
      helpNumber,
      topNote,
      footerText1,
      footerText2,
      fbLink,
      youtubeLink,
      siteLink}=req.body.data
      
    const sqlUpdateQuery= "UPDATE site_text SET `order_number`='"+orderNumber+"', `bkash_number`='"+bkashNumber+"', `help_number`='"+helpNumber+"', `top_note`='"+topNote+"', `footer_text1`='"+footerText1+"', `footer_text2`='"+footerText2+"', `fb_link`='"+fbLink+"',`youtube_link`='"+youtubeLink+"',`site_link`='"+siteLink+"'  WHERE `site_text_id`='"+req.params.id+"' "
    connection.query(sqlUpdateQuery,(err)=>{
      if(err){
        res.status(200).json({
          err,
          message:"update Faild",
          alert:`${new Date().getTime()}`
        })
      }
      else{
        res.status(200).json({
          message:"update successfully",
          alert:`${new Date().getTime()}`
        })
      }
    });
  }
})

module.exports=router