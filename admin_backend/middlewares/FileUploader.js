const path = require('path');
const multer = require("multer");

//file checking
const fileUploader=()=>{
  try {
    
    const DIR='./public/product_imgs';
    
    const storage=multer.diskStorage({
      destination:(req,file,cb)=>{
        cb(null,DIR);
      },
      filename:(req,file,cb)=>{
        const fileExt=path.extname(file.originalname);
    
        const date = new Date();
    
        const fileName=file.originalname
        .replace(fileExt,"")
        .toLowerCase()
        .split(' ')
        .join('-')+date.getTime();
    
        cb(null,fileName+fileExt);
      }
    });
    
    const upload=multer({
      storage:storage,
      fileFilter:(req,file,cb)=>{
        if (file.fieldname=="img") {
          if(
            file.mimetype==="image/png"||
            file.mimetype==="image/jpg"||
            file.mimetype==="image/jpeg"||
            file.mimetype==="image/jfif"||
            file.mimetype==="image/webp"
          ){
            cb(null,true);
          }
          else{
            cb(null,false);
            return cb(new Error('only .png .jpg .jpeg format allowed!'));
          }
        }
        else{
          cb(null,false);
          return cb(new Error('Only pImage file allowed!'));
        }
      }
    });
    return upload;
  }catch (error) {
    console.error(error);
  }
} 

module.exports=fileUploader