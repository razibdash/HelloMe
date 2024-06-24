const multer=require('multer');
const path=require('path');

function uploader(
    subfolder,
    allow_file_types,
    max_file_size,
    error_msg
){

    //file upload folder
    const UPLOAD_FOLDER=`${__dirname}/../public/upload/${subfolder}/`;
 
    //define the storage
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,UPLOAD_FOLDER);
        },
        filename:(req,file,cb)=>{
         const fileExt=path.extname(file.originalname);
         const fileName=file.originalname
         .replace(fileExt,"")
         .toLowerCase()
         .split(" ")
         .join(" ")+"_"+Date.now();
         cb(null,fileName + fileExt);
        },
    });
    //preapre the final upload object
    const upload=multer({
        storage:storage,
        limits:{
            fileSize:max_file_size,
        },
        fileFilter:(req,res,cb)=>{
            if(allow_file_types.includes(file.mimetype)){
                console.log(allow_file_types);
                cb(null,true);
            }else{
                cb(createError(error_msg));
            }
        },
    });
    //make upload object

    return upload;
}


module.exports=uploader;