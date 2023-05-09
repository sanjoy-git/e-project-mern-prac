const jwt=require("jsonwebtoken");
// require("dotenv").config();

const LoginCheck=(req,res,next)=>{
  try {
    // console.log(req.cookies)
    // const {authorization}=req.cookies
    const JWT_SECRET="w1D";
    const {authorization}=req.headers
    
    const token=authorization.split(' ')[1]
    // console.log(token)
    
    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
      if(err){
        res.status(500).json({
          Error:err,
          message:"login faild",
          alert:`${new Date().getTime()}`
        })
      }
      else if(decoded){
        // req.userName=decoded.admin_id,
        next();
      }
      else{
        res.status(500).json({
          message:"login faild",
          alert:`${new Date().getTime()}`
        })
      }
    });

  } catch (err) {
    res.status(500).json({
      Error:err,
      message: "login faild",
      alert:`${new Date().getTime()}`
    })
  }
}

module.exports=LoginCheck;
