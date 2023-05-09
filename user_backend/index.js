const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const Products = require("./routers/Products");
const SiteText = require("./routers/SiteText");
const Order = require("./routers/Order")

// Use
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));


app.use(Products);
app.use(Order);
app.use(SiteText);


// Test Get Route
app.get("/",(req,res)=>{
  res.send("user server is Successfully Running...");
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
const port = process.env.PORT || 4001;
app.listen(port, () => `Server running`);