const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const CUProduct=require("./routers/CUProduct");
const RUDProduct=require("./routers/RUDProduct");
const Login=require("./routers/Login");

// file uploader
const fileUploader = require('./middlewares/FileUploader');
const LoginValidation = require("./middlewares/LoginValidation");
const OrdersManage = require('./routers/OrderManage');
const Default = require('./routers/Default');
const SiteTextAdmin=require('./routers/SiteTextAdmin');
const Products = require("./routers/Products");
const SiteText = require("./routers/SiteText");
const Order = require("./routers/Order")

// User
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

// users
app.use(Products);
app.use(Order);
app.use(SiteText);

// admin
app.use(Login);
app.use("/cu",LoginValidation,fileUploader().single('img'),CUProduct);
app.use("/site-text-admin",SiteTextAdmin);
app.use("/rud",RUDProduct);
app.use("/order-manage",OrdersManage);

// Test Get Route
app.get("/",(req,res)=>{
  res.send("admin server is Successfully Running...");
});

// Error Handler
app.use((req,res,next)=>{
  res.send('Requested url was not found!')
  next();
})

app.use((err, req, res, next) => {
  if(res.headersSend){
    next('There was a problem!');
  }
  else{
    if(err.message){
      res.status(500).send(err.message);
    }
    else{
      res.send('There was an error!')
    }
  }
})


//Server Run
const port = process.env.PORT || 5000;
app.listen(port, () => `Server running`);